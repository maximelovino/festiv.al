require('dotenv').config({ path: "keys.env" });
const request = require('request');
const KEY = process.env.EVENTFUL;

exports.getEventsWithLocationAndRadius = (lat, lng, radius, callback) => {
	const options = {
		method: "GET",
		url: `http://api.eventful.com/json/events/search?app_key=${KEY}&where=${lat},${lng}&within=${radius}&date=Future&category=[music,festivals_parades]&page_size=250&sort_order=popularity`,
	}

	request(options, (error, response, body) => {
		if (!error & response.statusCode == 200) {
			const data = JSON.parse(body);
			if (data.events && data.events.event)
				callback(data.events.event);
			else
				callback(null);
		} else {
			console.log("Problem getting events from Eventful");
			console.log(response.body);
			callback(null);
		}
	})
};