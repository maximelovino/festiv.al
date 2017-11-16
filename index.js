require('dotenv').config({ path: "keys.env" });
const express = require('express');
const app = express();
const artists = require('./controllers/artists');
const events = require('./controllers/events');
app.set('view engine', 'pug');

app.use('/material', express.static(__dirname + '/node_modules/material-components-web/dist/'));
app.use('/scripts', express.static(__dirname + '/scripts/'));
app.use('/css', express.static(__dirname + '/css/'));

//Route to get the homepage of the site
app.get('/', (req, res) => {
    res.render('home');
});

//Route to get the infos of an artist
app.get('/artist/:name/infos', (req, res) => {
    artists.getSingleArtistInfos(req.params.name, (data) => {
        res.contentType('json');
        res.send(data);
    })
});

//Route to get the picture of an artist
app.get('/artist/:name/picture', (req, res) => {
    artists.getArtistPicture(req.params.name, (data) => {
        res.contentType('json');
        res.send(data);
    })
});

//Route to get a random top song of an artist
app.get('/artist/:name/song', (req, res) => {
    const name = req.params.name;
    console.log(name);
    artists.getArtistSong(name, (data) => {
        res.contentType('json');
        res.send(data);
    });
});


app.get('/events/location/:lat/:lng/:radius', (req,res) => {
    console.log("Events endpoint");
    console.log(req.params);
    events.getEventsWithLocationAndRadius(req.params.lat,req.params.lng,req.params.radius, (data) => {
        res.contentType('json');
        res.send(data);
    })
});

app.listen(3000, () => {
    console.log("Listening on http://localhost:3000/");
});