# Festiv.al - A search engine for music festivals and concerts

Festiv.al is a search engine for music festivals and concerts build around several publicly available APIs such as Spotify, MusicBrainz and Eventful.

## Structure

The project is in two parts, we have a REST server built in Node.js that will serve as a wrapper for the APIs used and the caching system. And we have a client served via Node.js as well, that will act as the frontend for our application. Those are two separate Node.js processes.

## Features

The features of our website are the following:

* Display musical events around a given location and display them on a map (using Google Maps)
  * Click on an event on the map to display a full page containing more infos and lineup for the event with detailled artists information
  * Hover over the event on the map to start playing a song from an artist present at the event
* Have a "now playing" bar always present on screen with the title, cover and artist of the currently playing song

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