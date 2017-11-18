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

//Route to get a song from an event
router.get('/events/:id/song', (req,res) => {
    events.getSongForEvent(req.params.id, (song) => {
        res.contentType('json');
        res.send(song);
    })
});

router.get('/events/:id/detail', (req,res) => {
    events.getSingleEvent(req.params.id, (event) => {
        res.json(event);
    })
});

module.exports = router;