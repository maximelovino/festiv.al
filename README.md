# Festiv.al - A search engine for music festivals and concerts

Festiv.al is a search engine for music festivals and concerts build around several publicly available APIs such as Spotify, MusicBrainz and Eventful.

## Features

The features of our website will be the following:

* Display musical events around a given location and display them on a map (using Google Maps)
  * Click on an event on the map to display a full page containing more infos and lineup for the event
  * Hover over the event on the map to start playing a song from an artist present at the event
  * Play music from artists on the full detailed event page
  * The ability to view a list of events for an artist by clicking his name on the lineup
* Have a "now playing" bar always present on screen with the title, cover and artist of the currently playing song
* A page to search for a list of events by a specific artist

## APIs used

* Spotify API
  * Playing song previews
  * Images from artists
  * Genres from artists
* MusicBrainz
  * Informations about artists
* Eventful
  * Events informations and lineup around a given location
* BandsInTown
  * Events informations for a given artist
* JamBase

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
  "followers": "<number_of_spotify_followers>"
}
```

For that we will use a combination of the Spotify API endpoint with a search for `artist` and the musicbrainz API with a query for an artist, as well as BandsInTown.

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
  "id": "<event_id>",
}
```

For this we will use Eventful with a search around a given location:

```
http://api.eventful.com/rest/events/search?app_key=<key>&where=<lat>,<lng>&within=<radius>&date=Future&category=[music,festivals_parades]
```

Then the idea is to get a list of the top current artists using the spotify API by getting a `toplists` playlist:

```
GET https://api.spotify.com/v1/browse/categories/toplists/playlists
GET https://api.spotify.com/v1/users/spotify/playlists/<playlistID>
```

Then we can search on BandsInTown for events for these artists and filter only the ones in the displayed area:

```
GET https://rest.bandsintown.com/artists/Muse/events?app_id=<app_id>
```

And then we aggregate the informations for all events services by matching the similar events by date, name and location, and we store them in our database.

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

#### Endpoint to get detail for an event

```
GET /events/<event_id>/detail
```

This will return JSON of the form:

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

## Technologies chosen

We're gonna run Node.js coupled with Express for our server. We're gonna use the Pug templating language to build the webpages for our clients from the Node.js server. So the Node.js server is gonna be our web server for our clients as well as our REST server. The REST client part is gonna be incorporated in the client-side javascript code. We're using modern JavaScript features such as Requests and Promises for our queries.

We decided to go with Node.js because of the wide support and community around it as well as the number of modules available on NPM.

### Aggregation of the different events informations providers

We're gonna group the informations coming from the events providers API by putting them in a database and generating an `event_id` in our database that we're gonna send to the client to identify uniquely an event. For the database, we're gonna use MySQL.