require('dotenv').config({path: "keys.env"});
const express = require('express');
const app = express();
const spotify = require('./controllers/spotify')
app.set('view engine', 'pug');

app.use('/material', express.static(__dirname + '/node_modules/material-components-web/dist/'));
app.use('/scripts', express.static(__dirname + '/scripts/'));
app.use('/css', express.static(__dirname + '/css/'));


app.get('/', (req, res) => {
    res.render('home');
});

//Route to display the picture of an artist
app.get('/artist/:name/picture/', (req, res) => {
    spotify.getPictureForAnArtist(req.params.name,(data) => {
        res.contentType('application/json');
        res.send(data);
    })
});

//Route to play a random top songs of an artist
app.get('/artist/:name/audio', (req, res) => {
    const name = req.params.name;
    spotify.getSongForArtist(name, (data) => {
        res.contentType('application/json');
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log("Listening on http://localhost:3000/");
});