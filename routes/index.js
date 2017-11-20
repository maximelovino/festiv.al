const artists = require('../controllers/artists');
const events = require('../controllers/events');
const express = require('express');
const router = express.Router();

/**
 * Pages routes
 */

//Route to get the homepage of the site
router.get('/', (req, res) => {
    res.render('home');
});

//Route to get the details page of a specific event
router.get('/events/:id/detail', (req, res) => {
    events.getSingleEvent(req.params.id, (event) => {
        if (event)
            res.render('eventDetail', { event });
        else
            res.sendStatus(404);
    })
});

/**
 * API Routes
 */

//Route to get the infos of an artist
router.get('/artist/:name/infos', (req, res) => {
    artists.getSingleArtistInfos(req.params.name, (data) => {
        res.contentType('json');
        res.send(data);
    })
});

/**
 * 
 * @api {GET} /artist/:name/picture Get a picture from an artist
 * @apiName GetArtistPicture
 * @apiGroup Artists
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} name The artist name
 * 
 * @apiSuccess (200) {String} name The name of the artist
 * @apiSuccess (200) {String} picture The url of the picture
 * 
 * @apiParamExample  {String} Request-Example:
    {
        "name" : "Muse"
    }
 * 
 * 
 * @apiSuccessExample {Object} Success-Response:
    {
        "name": "Muse",
        "picture": "https://i.scdn.co/image/19ac88c7aec1f68aa6e207aff29efa15d37336a7"
    }
 * 
 * 
 */
router.get('/artist/:name/picture', (req, res) => {
    artists.getArtistPicture(req.params.name, (data) => {
        if (data)
            res.json(data);
        else
            res.sendStatus(404);
    })
});

/**
 * 
 * @api {GET} /artist/:name/song Get a song from an artist
 * @apiName GetArtistSong
 * @apiGroup Artists
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} name The artist name
 * 
 * @apiSuccess (200) {String} title The title of the song
 * @apiSuccess (200) {String[]} artists The artists of the song
 * @apiSuccess (200) {String} cover_img The url of the song cover image
 * @apiSuccess (200) {String} preview_link The url of the song preview
 * 
 * @apiParamExample  {String} Request-Example:
    {
        "name" : "Muse"
    }
 * 
 * 
 * @apiSuccessExample {Object} Success-Response:
    {
        "title": "Supermassive Black Hole",
        "artists": ["Muse"],
        "cover_img": "https://i.scdn.co/image/9e5288926fadb82f873ccf2b45300c3a6f65fa14",
        "preview_link": "https://p.scdn.co/mp3-preview/7ab3e38ce1671da3a185d8685981983a6f39b7bd?cid=49db2e64f73b47a79bef41d3356efdfc"
    }
 * 
 * 
 */
router.get('/artist/:name/song', (req, res) => {
    const name = req.params.name;
    console.log(name);
    artists.getArtistSong(name, (data) => {
        if (data)
            res.json(data);
        else
            res.sendStatus(404);
    });
});

//Route to get events around a given location
router.get('/events/location/:lat/:lng/:radius', (req, res) => {
    console.log("Events endpoint");
    console.log(req.params);
    events.getEventsWithLocationAndRadius(req.params.lat, req.params.lng, req.params.radius, (data) => {
        res.contentType('json');
        res.send(data);
    })
});

/**
 * 
 * @api {GET} /events/:id/song Get a song from one of the artists of an event
 * @apiName GetSongForEvent
 * @apiGroup Events
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} id The id of the event
 * 
 * @apiSuccess (200) {String} title The title of the song
 * @apiSuccess (200) {String[]} artists The artists of the song
 * @apiSuccess (200) {String} cover_img The url of the song cover image
 * @apiSuccess (200) {String} preview_link The url of the song preview
 * 
 * @apiParamExample  {String} Request-Example:
    {
        "id" : "c10960e9-848e-46aa-a823-45ea82b0a18e"
    }
 * 
 * 
 * @apiSuccessExample {Object} Success-Response:
    {
        "title": "Le suicide",
        "artists": ["Barcella"],
        "cover_img": "https://i.scdn.co/image/5216c34f96935ba3af55da1237dada03b1618c31",
        "preview_link": "https://p.scdn.co/mp3-preview/a77d9b92bb2df6fc71a44c7517850000c095714d?cid=49db2e64f73b47a79bef41d3356efdfc"
    }
 * 
 * 
 */
router.get('/events/:id/song', (req, res) => {
    events.getSongForEvent(req.params.id, (song) => {
        if (song) {
            res.json(song);
        } else {
            res.sendStatus(404);
        }
    })
});

module.exports = router;