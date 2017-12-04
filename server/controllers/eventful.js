require('dotenv').config({ path: "keys.env" });
const request = require('request-promise-native');
const KEY = process.env.EVENTFUL;
const log = require('winston');

exports.getEventsWithLocationAndRadius = (lat, lng, radius, callback) => {
	const options = {
		method: "GET",
		url: `http://api.eventful.com/json/events/search?app_key=${KEY}&where=${lat},${lng}&within=${radius}&date=Future&category=[music,festivals_parades]&page_size=250&sort_order=popularity`,
		json: true,
	}

	request(options).then(data => {
		if (data.events && data.events.event) {
			callback(data.events.event)
		} else {
			callback(null);
		}
	}).catch(error => {
		log.warn("Problem getting events from Eventful");
		log.warn(error);
		callback(null);
	});
};