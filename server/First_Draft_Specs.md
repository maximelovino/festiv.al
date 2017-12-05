# Festiv.al - First specs

## Endpoints of our REST server

### Artists

#### Endpoint to get a random song for an artist

```
GET /artist/<artist_name>/song
```

That will return a JSON response to the client of the following form:

```json
{
  "title": "Starlight",
  "artists": ["Muse","...<featuringArtists>"],
  "cover_img": "<url_cover>",
  "preview_link": "<audio_preview_link>"
}
```

For that we will use the search endpoint from the Spotify API with a type of `artist` and then from the ID of the artist, we can get the top tracks, an example query would be:

```
GET https://api.spotify.com/v1/search?query=Muse&type=artist
GET https://api.spotify.com/v1/artists/{id}/top-tracks
```

#### Endpoint to get picture of an artist

```
GET /artist/<artist_name>/picture
```

That will return a JSON response to the client of the following form:

```json
{
  "artist": "Muse",
  "picture": "<picture_url>"
}
```

For that we will use the search endpoint from the Spotify API with a type of `artist`, an example of query would be:

```
GET https://api.spotify.com/v1/search?query=Muse&type=artist
```

#### Endpoint to get informations about an artist

```
GET /artist/<artist_name>/infos
```

That will return a JSON response to the client of the following form:

```json
{
  "name": "Muse",
  "country": "GB",
  "year": 1997,
  "genres": ["rock", "pop"],
  "description": "<description_text>",
  "followers": "<number_of_spotify_followers>",
  "facebook": "<facebook page link>",
}
```

For that we will use a combination of the Spotify API endpoint with a search for `artist` and the musicbrainz API with a query for an artist, as well as BandsInTown. BandsInTown will actually provide use with an MBID, which is a unique identifier used to request artist information on MusicBrainz.

```
GET https://api.spotify.com/v1/search?query=Muse&type=artist
```

```
GET http://musicbrainz.org/ws/2/artist/?query=Muse
```

```
GET https://rest.bandsintown.com/artists/Muse?app_id=<app_id>
```

For merging these three endpoints, we're gonna use the Spotify data as the reference.

### Events

#### Endpoint to get a list of events around a given location

```
GET /events/location/<lat>/<lng>/<radius>
```

That will return a JSON list of events of the following form:

```json
{
  "name": "<name>",
  "venue_name": "<venue_name>",
  "position": {"lat": "<lat>", "lng": "<lng>"},
  "lineup": ["<artist1_name>","<artist2_name>","..."],
  "id": "<event_id>",
  "date": "<date>",
  "description": "<description>",
  "ticketshop": "<ticketshop_link>"
}
```

For this we will use Eventful with a search around a given location:

```
http://api.eventful.com/json/events/search?app_key=<key>&where=<lat>,<lng>&within=<radius>&date=Future&category=[music,festivals_parades]
```

Then we will filter to get only the events showing us a clear list of performers, and we're gonna match these events with BandsInTown by searching for the events of the first performer and matching the venue (and date).

```
GET https://rest.bandsintown.com/artists/Muse/events?app_id=<app_id>
```

Some events are gonna have BandsInTown and some won't.

#### Endpoint to get all events for a given artist

```
GET /events/artist/<artist_name>
```

Response similar to events around location

We're gonna get the events for an artist from the BandsInTown API

```
GET https://rest.bandsintown.com/artists/Muse/events?app_id=<app_id>
```

#### Endpoint to get a random song for an event

```
GET /events/<event_id>/song
```

This will return a response like the one for the artist song.

Our backend is gonna look at the lineup and pick an artist and use the Spotify route to get a song.

## Website pages

### Home page

```
GET /
```

This is the home page of our website, containing the interactive map. The basic page is rendered server-side with Pug and sent to the client, then fetch requests are made for getting events and playing songs.

### Event detail page

```
GET /events/<event_id>/detail
```

This will be a page with the details about a specific event. The page will be rendered server-side with Pug and sent to the client.

## Technologies chosen

We're gonna run Node.js coupled with Express for our server. We're gonna use the Pug templating language to build the webpages for our clients from the Node.js server. So the Node.js server is gonna be our web server for our clients as well as our REST server. The REST client part is gonna be incorporated in the client-side javascript code. We're using modern JavaScript features such as Requests and Promises for our queries.

We decided to go with Node.js because of the wide support and community around it as well as the number of modules available on NPM.

### Aggregation of the different events informations providers

We're gonna group the informations coming from the events providers API by putting them in a database and generating an `event_id` in our database that we're gonna send to the client with the event to identify uniquely an event. For the database, we're gonna use MongoDB because of its good integration with Node.js and the data that we want to store fits well into that model.

We insert into the database every event we send after a request, even if this event was already in the DB. The DB is only used to get back the details of the events if the user clicks on details.

Every insertion has a TTL of 24h, so it's removed from the databse after that period. If a new request for the same event is made and the result is the same, the TTL is reset to 24h from that new request.