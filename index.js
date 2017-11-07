require('dotenv').config({path: "keys.env"});
const express = require('express');
const b64 = require('base-64');
let request = require('request');
const app = express();
const spotifyID = process.env.SPOTIFY_ID;
const spotifySecret = process.env.SPOTIFY_SECRET;
let token = '';


app.get('/', (req, res) => {
    res.send("Welcome to Festiv.al");
});

app.get('/user/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
});

//Route to generate a token, call this one first
app.get('/token', (req, res) => {
    const keyToSend = `${spotifyID}:${spotifySecret}`;
    const b64Key = b64.encode(keyToSend);
    const options = {
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        headers: {
            'Authorization': `Basic ${b64Key}`,
        },
        form: {
            'grant_type': "client_credentials",
        },
    };
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            token = data.access_token;
            res.send(`Saved new token ${token}`);
        }
    })
});

//Route to display the picture of an artist
app.get('/artist/picture/:name', (req, res) => {
    const artistName = req.params.name;
    const options = {
        url: `https://api.spotify.com/v1/search?query=${artistName}&type=artist`,
        method: "GET",
        headers: {
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`,
        }
    };

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const heroImgUrl = data.artists.items[0].images[0].url;
            res.send(`<img src=${heroImgUrl}>`);
        } else {
            console.log(response);
            res.send("There was a problem");
        }
    });

});

//Route to play a song from the artist with the album art
app.get('/artist/audio/:name', (req, res) => {
    const artistName = req.params.name;
    const options = {
        url: `https://api.spotify.com/v1/search?query=${artistName}&type=track`,
        method: "GET",
        headers: {
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`,
        }
    };
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            let songUrl = null;
            let coverURL = '';
            let i = 0;
            //TODO if nothing after first page, we should continue looking at other pages...of course we have to be sure it's the correct artist
            while (songUrl == null) {
                coverURL = data.tracks.items[i].album.images[0].url;
                songUrl = data.tracks.items[i].preview_url;
                i++;
            }
            console.log(songUrl);
            res.send(`<img src=${coverURL}><br><audio controls autoplay><source src=${songUrl} type="audio/mpeg"></audio>`);
        } else {
            console.log(response);
            res.send("There was a problem");
        }
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});