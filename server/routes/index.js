const artists = require('../controllers/artists');
const events = require('../controllers/events');
const express = require('express');
const geo = require('../controllers/geo');
const router = express.Router();

/**
 * API Routes
 */

/**
 * 
 * @api {GET} /artist/:name/infos Get information from an artist
 * @apiName GetArtistInfos
 * @apiGroup Artists
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} name The artist name
 * 
 * @apiSuccess (200) {String} name The name of the artist
 * @apiSuccess (200) {String} country The two letters country code of the artist
 * @apiSuccess (200) {String} year The year of the start of the career of the artist
 * @apiSuccess (200) {String[]} genres The genres of the artist's music
 * @apiSuccess (200) {String} description A small description of the artist
 * @apiSuccess (200) {Number} followers The number of Spotify followers of the artist
 * @apiSuccess (200) {String} Facebook The facebook page link of the artist
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
        "country": "GB",
        "year": "1994",
        "genres": [
            "alternative metal",
            "alternative rock",
            "garage rock",
            "indie rock",
            "modern rock",
            "permanent wave",
            "piano rock",
            "post-grunge",
            "rock"
        ],
        "description": "UK rock band",
        "followers": 3116943,
        "facebook": "http://www.facebook.com/muse"
    }
 * 
 * 
 */
router.get('/artist/:name/infos', (req, res) => {
    artists.getSingleArtistInfos(req.params.name, (data) => {
        if (data)
            res.json(data);
        else
            res.sendStatus(404);
    });
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

/**
 * 
 * @api {GET} /events/location/:centerlat/:centerlng/:swlat/:swlng/:nelat/:nelng/:cached? Get a list of events around a given location
 * @apiName GetEventsWithLocation
 * @apiGroup Events
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {Number} centerlat The latitude of the map center, in degrees
 * @apiParam  {Number} centerlng The longitude of the map center, in degrees
 * @apiParam  {Number} swlat The latitude of the southwest point of the map, in degrees
 * @apiParam  {Number} swlng The longitude of the southwest point of the map, in degrees
 * @apiParam  {Number} nelat The latitude of the northeast point of the map, in degrees
 * @apiParam  {Number} nelng The longitude of the northeast point of the map, in degrees
 * @apiParam  {String} cached If set to "cached", cached data will be sent back, otherwise live data
 * 
 * @apiSuccess (200) {Object[]} events The list of events is sent as response
 * @apiSuccess (200) {String} events.name The name of the event
 * @apiSuccess (200) {String} events.venue_name The name of the venue of the event
 * @apiSuccess (200) {Object} events.position The location of the event
 * @apiSuccess (200) {Number} events.position.lat The latitude of the event
 * @apiSuccess (200) {Number} events.position.lng The longitude of the event
 * @apiSuccess (200) {String[]} events.lineup The lineup of the event
 * @apiSuccess (200) {String} events.id The id of the event
 * @apiSuccess (200) {String} events.date The date of the event in format YYYY-MM-DD
 * @apiSuccess (200) {String} events.description The description of the event
 * @apiSuccess (200) {String} events.ticketshop The link to the ticketshop
 * 
 * 
 * @apiParamExample  {String} Request-Example:
    {
        "centerlat": "46.510098934912456",
        "centerlng": "6.635857986139854",
        "swlat": "46.510098934912456",
        "swlng": "6.635857986139854",
        "nelat": "46.510098934912456",
        "swlng": "6.635857986139854",
        "cached": "cached",
    }
 * 
 * 
 * @apiSuccessExample {Object} Success-Response:
    [
        {
            "name": "Fever Ray",
            "venue_name": "Les Docks",
            "position": {
                "lat": 46.5333,
                "lng": 6.66667
            },
            "lineup": [
                "Fever Ray"
            ],
            "id": "8ce75af8-9240-467a-a23f-1d8e7041783b",
            "date": "2018-02-23",
            "description": "",
            "ticketshop": "https://www.bandsintown.com/t/20435848?app_id=FestivDotAl&came_from=267"
        },
        {
            "name": "The Atomic Bitchwax (us), Mammoth Mammoth (as) (Caves du Manoir)",
            "venue_name": "Les Caves Du Manoir",
            "position": {
                "lat": 46.1,
                "lng": 7.08333
            },
            "lineup": [
                "The Atomic Bitchwax",
                "MAMMOTH MAMMOTH"
            ],
            "id": "6327f6f3-5860-4810-84f3-bd49a1033427",
            "date": "2017-11-22",
            "description": " <b>The Atomic Bitchwax</b><br> (US - Stoner rock)<br><br> À la base plus un side project, qu&#39;un véritable groupe en tant que tel, THE ATOMIC BITCHWAX a vu le jour au début des années 90 dans le New Jersey. À cette époque, Ed Mundell (Monster Magnet 1992 \u0096 2010), Chris Kosnik (ex Godspeed) et Keith Ackermann, décident de former un groupe dans le but de jammer durant leur temps libre. Il leur faudra presque 7 ans pour se décider à sortir leur premier album, durant l&#39;été 1999. Depuis, ils ont dévoilé en tout 2 EPs et 6 albums studio, dont le dernier intitulé &quot;Gravitron&quot;, sorti en avril 2015. Entre-temps, Finn Ryan (ex Core) a remplacé Ed Mundell en 2005 à la guitare et Bob Pantella (Monster Magnet) a pris la place de Keith Ackermann à la batterie en 2007. Seul Chris Kosnik, qui a d&#39;ailleurs rejoint Monster Magnet en 2013, subsiste depuis les débuts du groupe. Pour ceux qui s&#39;en souviennent, THE ATOMIC BITCHWAX était déjà de passage aux Caves du Manoir en 2014, dans le cadre du PALP Festival. À cette époque, ils nous présentaient notamment l&#39;album &quot;The Local Fuzz&quot;, sorti en 2011. Un incroyable disque composé d&#39;une seule chanson instrumentale de plus de 42 minutes. Vous l&#39;aurez deviné, ces gars-là connaissent leur sujet sur le bout des doigts. Du Stoner Rock comme on aime, largement influencé par le rock psychédélique des 60s et les gros riffs des 70s. Amateurs de Monster Magnet (bien évidemment) et de riffs (au sens noble du terme hein), ne ratez ce concert sous aucun prétexte. Vos esgourdes vous diront merci.<br><br><b>Mammoth Mammoth</b><br> (AS - Hard-rock, stoner rock)<br><br> Quand les Australiens de MAMMOTH MAMMOTH se déplacent en Europe, ce n&#39;est jamais pour faire dans la dentelle. Comme leur nom l\u0092indique, leur Hard Rock/Stoner ne fait ni dans la légèreté ni dans la subtilité. C&#39;est un peu comme débarquer au mariage de ta cousine à fond, dans une vieille caisse qui tient à peine la route, du Motörhead à coin dans la radio et ta plus belle veste à patch. Le tout, avec une canette à la main et une clope au coin du bec bien sûr. En gros, ce qui va passer est très simple : ils vont arriver sur scène, brancher leurs guitares, monter le son et faire tomber vos chagnottes les unes après les autres. On sait pas vous, mais nous, on se réjouit !",
            "ticketshop": ""
        },
        {
            "name": "The Amazons - Cold bath",
            "venue_name": "Les Docks",
            "position": {
                "lat": 46.5333,
                "lng": 6.66667
            },
            "lineup": [
                "The Amazons"
            ],
            "id": "bc6d0ec3-778d-4c68-b754-b2141067e3ee",
            "date": "2017-11-21",
            "description": "",
            "ticketshop": "https://www.bandsintown.com/t/18383087?app_id=FestivDotAl&came_from=267"
        },
        {
            "name": "Los Fastidios (Gaskessel)",
            "venue_name": "Gaskessel",
            "position": {
                "lat": 46.9383456,
                "lng": 7.4424018
            },
            "lineup": [
                "Los Fastidios"
            ],
            "id": "37a42888-7fa7-432a-a271-2e5ac06fa5a5",
            "date": "2017-11-24",
            "description": " Mit LOS FASTIDIOS aus Verona gastiert eine der wichtigsten Streetpunk-/Oi!-Bands Italiens im Gaskessel Bern. Neben der passenden Message vereinen LOS FASTIDIOS in ihrem Sound das Beste aus Punkrock, melodischem Hardcore, Rock&#39;n&#39;Roll und Ska, hohe Tanzbarkeit ist somit garantiert.",
            "ticketshop": "https://www.bandsintown.com/t/20186885?app_id=FestivDotAl&came_from=267"
        },
        {
            "name": "Dr. Feelgood (Le Singe)",
            "venue_name": "Le Singe",
            "position": {
                "lat": 47.1667,
                "lng": 7.25
            },
            "lineup": [
                "Dr. Feelgood"
            ],
            "id": "786e6fcc-9439-4423-99b6-96f77f286245",
            "date": "2017-11-22",
            "description": " Dr. Feelgood ist noch heute einer der weltweit beliebtesten und aufregendsten Rhythm & Blues-Live-Acts. Gegründet wurde die Band 1971 von Sänger Lee Brilleaux und Gitarrist Wilko Johnson auf Canvey Island in Essex, bald darauf wurde sie von Bassist John B. Sparks und Schlagzeuger John Martin komplettiert. Obwohl 1994 das letzte verbliebene Gründungsmitglied verstarb, ist Dr. Feelgood heute besser denn je. Dr. Feelgood ist eine der wenigen Bands, die im \u0084British Blues Boom&quot; und in der Punk-Ära gleichermassen Erfolg hatten. Wie viele andere Pub-Rock-Bands war sie hauptsächlich durch ihre Live-Auftritte bekannt. Mit ihrem 1976 erschienenen Livealbum \u0084Stupidity&quot; landeten Dr. Feelgood sofort auf Platz eins der englischen Charts. Auf ihm findet sich der Stil ihrer rauen und kompromisslosen Auftritte wieder. Mit Hitsingles wie \u0084Roxette&quot;, \u0084Back in the Night&quot; oder \u0084Milk and Alcohol&quot; feierte die Band weltweite Erfolge. Der Hit \u0084See You Later Alligator&quot; bescherte der Gruppe ihre erste Goldscheibe. Die jüngste Veröffentlichung von Dr. Feelgood ist die DVD \u0084Live in London&quot; mit Filmmaterial und Aufzeichnungen vom \u0084Lee Brilleaux Memorial&quot; 2005 sowie einer Sammlung einiger ihrer erfolgreichsten Songs mit frischem Anstrich.",
            "ticketshop": "https://www.bandsintown.com/t/19468998?app_id=FestivDotAl&came_from=267"
        },
        {
            "name": "Sleep Party People (Bad Bonn)",
            "venue_name": "Bad Bonn",
            "position": {
                "lat": 46.8615737,
                "lng": 7.1801778
            },
            "lineup": [
                "SLEEP PARTY PEOPLE"
            ],
            "id": "25c7a082-a8f9-4a54-b513-4f8e205c3d8c",
            "date": "2017-11-24",
            "description": " Imagine all the dreams in the colour of Pop. <p> Ist es wirklich eine gute Idee, in der Jagdsaison mit einer Hasenmaske rumzulaufen? Den Dänen Brian Batz alias Sleep Party People kümmerts nicht. Sein Puls bleibt stets auf Yogi-Frequenz. Darum auch der Schlaf im Namen. Und gleich noch ein Dream vor den Pop. Nicht immer ungestört. Was Batz, wahlweise allein oder mit seinen Mit-Hasen, auf die Bühne bringt, lebt nicht nur von der Ruhe, sondern auch von der Dynamik. Bunt bewegte Träume sind garantiert. <p> Est-ce vraiment une bonne idée de se balader déguisé en lapin lors de la saison de chasse ? Le Danois Brian Batz \u0096 alias Sleep Party People \u0096 ne s\u0092en préoccupe gère. Il est toujours parfaitement zen. D\u0092où le sommeil dans son nom. Et un dream devant sa pop. Un calme tout de même quelquefois bousculé. Ce que Batz nous présente sur scène \u0096 avec ou sans ses co-lapins \u0096 est du calme marié à un dynamisme pur. Des rêves mouvementés et pleins de couleurs sont garantis ! <p> (Text: Ivo Stritt)<p> VORVERKAUF / PRÉLOCATION<br><a href=\"http://www.starticket.ch/0showlist.asp?Language=D&txtSearch=bad+bonn&suchen.x=0&suchen.y=0&fulltextHidden=1\" rel=\"nofollow\">www.starticket.ch</a></p></p></p></p>",
            "ticketshop": "https://www.bandsintown.com/t/18775234?app_id=FestivDotAl&came_from=267"
        },
        {
            "name": "Kodama / Jazz (Le Bout du Monde)",
            "venue_name": "Le Bout Du Monde",
            "position": {
                "lat": 46.4582313,
                "lng": 6.8507802
            },
            "lineup": [
                "KODAMA"
            ],
            "id": "fc9e7fac-72db-4918-9d29-67b2b74ad15a",
            "date": "2017-11-29",
            "description": " Les Kodama sont les esprits des arbres qui produisent les échos que l\u0092on entend dans les montagnes. Patrice Moret et Ganesh Geymeier décident de partir à la recherche de ces échos avec leurs instruments. Le spirit de Kodama est une nécessité pour développer ces sons et ces espaces qui sont vitaux dans leur musique.",
            "ticketshop": "https://www.bandsintown.com/t/20231956?app_id=FestivDotAl&came_from=267"
        },
        //.....
    ]
 * 
 * 
 */
router.get('/events/location/:centerlat/:centerlng/:swlat/:swlng/:nelat/:nelng/:cached?', (req, res) => {
    console.log("Events endpoint");
    console.log(req.params);
    if (req.params.cached && req.params.cached == "cached") {
        console.log("CACHED ENDPOINT");
        events.getEventsFromDB(req.params.swlat, req.params.swlng, req.params.nelat, req.params.nelng).then(data => {
            if (data && data.length > 0) {
                res.json(data);
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        const rad = geo.getRadius(req.params.swlat, req.params.swlng, req.params.nelat, req.params.nelng);
        console.log(`radius: ${rad}`);
        events.getEventsWithLocationAndRadius(req.params.centerlat, req.params.centerlng, rad, (data) => {
            if (data)
                res.json(data)
            else
                res.sendStatus(404);
        });
    }
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

/**
 * 
 * @api {GET} /events/:id/details Get the details for an event
 * @apiName GetEventDetails
 * @apiGroup Events
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} id The id of the event
 * 
 * @apiSuccess (200) {String} name The name of the event
 * @apiSuccess (200) {String} venue_name The name of the venue of the event
 * @apiSuccess (200) {Object} position The location of the event
 * @apiSuccess (200) {Number} position.lat The latitude of the event
 * @apiSuccess (200) {Number} position.lng The longitude of the event
 * @apiSuccess (200) {String[]} lineup The lineup of the event
 * @apiSuccess (200) {String} id The id of the event
 * @apiSuccess (200) {String} date The date of the event in format YYYY-MM-DD
 * @apiSuccess (200) {String} description The description of the event
 * @apiSuccess (200) {String} ticketshop The link to the ticketshop
 * 
 * @apiParamExample  {String} Request-Example:
    {
        "id" : "6e200907ba596840d19e967f2c98822fd071a312fa5685d55fb8db93d68d6f24"
    }
 * 
 * 
 * @apiSuccessExample {Object} Success-Response:
    {
        "name": "Sleep Party People (Bad Bonn)",
        "venue_name": "Bad Bonn",
        "position": {
            "lat": 46.8615737,
            "lng": 7.1801778
        },
        "lineup": [
            "SLEEP PARTY PEOPLE"
        ],
        "id": "6e200907ba596840d19e967f2c98822fd071a312fa5685d55fb8db93d68d6f24",
        "date": "2017-11-24",
        "description": " Imagine all the dreams in the colour of Pop. <p> Ist es wirklich eine gute Idee, in der Jagdsaison mit einer Hasenmaske rumzulaufen? Den Dänen Brian Batz alias Sleep Party People kümmerts nicht. Sein Puls bleibt stets auf Yogi-Frequenz. Darum auch der Schlaf im Namen. Und gleich noch ein Dream vor den Pop. Nicht immer ungestört. Was Batz, wahlweise allein oder mit seinen Mit-Hasen, auf die Bühne bringt, lebt nicht nur von der Ruhe, sondern auch von der Dynamik. Bunt bewegte Träume sind garantiert. <p> Est-ce vraiment une bonne idée de se balader déguisé en lapin lors de la saison de chasse ? Le Danois Brian Batz \u0096 alias Sleep Party People \u0096 ne s\u0092en préoccupe gère. Il est toujours parfaitement zen. D\u0092où le sommeil dans son nom. Et un dream devant sa pop. Un calme tout de même quelquefois bousculé. Ce que Batz nous présente sur scène \u0096 avec ou sans ses co-lapins \u0096 est du calme marié à un dynamisme pur. Des rêves mouvementés et pleins de couleurs sont garantis ! <p> (Text: Ivo Stritt)<p> VORVERKAUF / PRÉLOCATION<br><a href=\"http://www.starticket.ch/0showlist.asp?Language=D&txtSearch=bad+bonn&suchen.x=0&suchen.y=0&fulltextHidden=1\" rel=\"nofollow\">www.starticket.ch</a></p></p></p></p>",
        "ticketshop": "https://www.bandsintown.com/t/18775234?app_id=FestivDotAl&came_from=267"
    }
 * 
 * 
 */
router.get('/events/:id/details', (req, res) => {
    events.getSingleEvent(req.params.id, (data) => {
        if (data) {
            data.created = undefined; // we remove this field
            res.json(data);
        } else {
            res.sendStatus(404);
        }
    });
});

module.exports = router;