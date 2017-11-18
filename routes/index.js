const artists = require('../controllers/artists');
const events = require('../controllers/events');
const express = require('express');
const router = express.Router();

//Route to get the homepage of the site
router.get('/', (req, res) => {
    res.render('home');
});

//Route to get the infos of an artist
router.get('/artist/:name/infos', (req, res) => {
    artists.getSingleArtistInfos(req.params.name, (data) => {
        res.contentType('json');
        res.send(data);
    })
});

//Route to get the picture of an artist
router.get('/artist/:name/picture', (req, res) => {
    artists.getArtistPicture(req.params.name, (data) => {
        res.contentType('json');
        res.send(data);
    })
});

//Route to get a random top song of an artist
router.get('/artist/:name/song', (req, res) => {
    const name = req.params.name;
    console.log(name);
    artists.getArtistSong(name, (data) => {
        res.contentType('json');
        res.send(data);
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
 * @apiSuccess (200) {Object} SongEntry An entry for a song with link to preview, cover, title and artists
 * 
 * @apiParamExample  {String} Request-Example:
    {
        id : c10960e9-848e-46aa-a823-45ea82b0a18e
    }
 * 
 * 
 * @apiSuccessExample {Object} Success-Response:
    {
        "title": "Le suicide",
        "artists": [
            "Barcella"
        ],
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

//Route to get the details of a specific event, gonna be changed to render a page
router.get('/events/:id/detail', (req, res) => {
    events.getSingleEvent(req.params.id, (event) => {
        if (event)
            res.render('eventDetail', {event});
        else
            res.sendStatus(404);
    })
});

module.exports = router;