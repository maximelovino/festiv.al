require('dotenv').config({path: "keys.env"});
const request = require('request');
const KEY = process.env.EVENTFUL;

exports.getEventsWithLocationAndRadius = (lat,lng, radius, callback) => {
	const options = {
		method: "GET",
		url: `http://api.eventful.com/json/events/search?app_key=${KEY}&where=${lat},${lng}&within=${radius}&date=Future&category=[music,festivals_parades]&page_size=250`,
	}

	request(options, (error, response, body) => {
		if (!error & response.statusCode == 200){
			const data = JSON.parse(body);
			callback(data.events.event);
		}else{
			console.log("Problem getting events from Eventful");
			console.log(error);
			console.log(response);
		}
	})
};