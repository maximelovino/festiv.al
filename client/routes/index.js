const express = require('express');
const router = express.Router();
const request = require('request');
const endpointBaseURL = "http://localhost:3000";

/**
 * Client routes
 */

//Route to get the homepage of the site
router.get('/', (req, res) => {
    res.render('home');
});

//Route to get the details page of a specific event
router.get('/events/:id/detail', (req, res) => {
    const options = {
        method: 'GET',
        url: `${endpointBaseURL}/events/${req.params.id}/details`,
    }

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const event = JSON.parse(body);
            res.render('eventDetail', { event });
        } else {
            res.sendStatus(404);
        }
    });
});

module.exports = router;