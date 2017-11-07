# Festiv.al - A search engine for music festivals and concerts

Festiv.al is a search engine for music festivals and concerts build around several publicly available such as Spotify, MusicBrainz and Eventful.

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
GET /artist/song/<artist_name>
```

That will return a JSON response to the client of the following form:

```json
{
  "title": "Starlight",
  "artist": "Muse",
  "cover_img": "<url_cover>",
  "preview_link": "<audio_preview_link>"
}
```

#### Endpoint to get picture of an artist

```
GET /artist/picture/<artist_name>
```

That will return a JSON response to the client of the following form:

```json
{
  "artist": "Muse",
  "picture": "<picture_url>"
}
```

#### Endpoint to get informations about an artist

```
GET /artist/infos/<artist_name>
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

### Events

#### Endpoint to get a list of events around a given location

```
GET /events/location/<lat>/<lng>
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

#### Endpoint to get all events for a given artist

```
GET /events/artist/<artist_name>
```

Response similar to events around location

#### Endpoint to get a random song for an event

```
GET /events/song/<event_id>
```

This will return a response like the one for the artist song.

#### Endpoint to get detail for an event

```
GET /events/detail/<event_id>
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

## Technologies choosen

We're gonna run Node.js coupled with Express for our server. We're gonna use the Pug templating language to build the webpages for our clients from the Node.js server. So the Node.js server is gonna be our web server for our clients as well as our REST server. The REST client part is gonna be incorporated in the client-side javascript code. We're using modern JavaScript features such as Requests and Promises for our queries.

We decided to go with Node.js because of the wide support and community around it as well as the number of modules available on NPM.