require('dotenv').config({ path: "keys.env" });
const b64 = require('base-64');
let request = require('request');
const spotifyID = process.env.SPOTIFY_ID;
const spotifySecret = process.env.SPOTIFY_SECRET;
let token = "";

function generateToken(callback) {
    console.log("Entered the token function");
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
            console.log(`TOKEN ${token}`);
            callback();
        }
    });
}


function getArtist(artistName, callback) {
    if (token == "") {
        generateToken(() => getArtist(artistName, callback))
    } else {
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
                const artist = data.artists.items[0];
                callback(artist);
            } else {
                console.log("PROBLEM in getting artist info");
                generateToken(() => getArtist(artistName, callback))
            }
        })
    }
}

function getPictureForAnArtist(artistName, callback) {
    getArtist(artistName, (artist) => {
        const toSend = {
            "name": artist.name,
            "picture": artist.images[0].url,
        }
        callback(toSend);
    });
}

function getSongForArtist(artistName, callback) {
    getArtist(artistName, (artist) => {
        const id = artist.id;

        const options = {
            url: `https://api.spotify.com/v1/artists/${id}/top-tracks?country=CH`,
            method: "GET",
            headers: {
                'Accept': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        }

        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                const tracks = data.tracks;
                const tracksWithPreview = tracks.filter((t) => t.preview_url != null);
                const choices = tracksWithPreview.map((t) => {
                    return {
                        'title': t.name,
                        'artists': t.artists.map(artist => artist.name),
                        'cover_img': t.album.images[0].url,
                        'preview_link': t.preview_url,
                    };
                });
                const toSend = choices[Math.floor(Math.random() * choices.length)]
                callback(toSend);
            } else {
                console.log("PROBLEM in getting top tracks");
                generateToken(() => getSongForArtist(artistName, callback))
            }
        })

    })
}

exports.getPictureForAnArtist = getPictureForAnArtist;
exports.getSongForArtist = getSongForArtist;
exports.getArtist = getArtist;
