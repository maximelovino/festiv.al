const APP_ID = "FestivDotAl";
const request = require('request');

exports.getSingleArtist = (artistName, callback) => {
	const options = {
		method: 'GET',
		url: `https://rest.bandsintown.com/artists/${artistName}?app_id=${APP_ID}`,
		headers: {
			'Accept': "application/json",
		}
	}

	request(options, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			callback(data);
		} else {
			console.log("Problem getting artist from bandsInTown");
			console.log(error);
			console.log(response);
		}
	});
}

exports.getEventsForArtist = (artistName, callback) => {
	const options = {
		method: 'GET',
		url: `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${APP_ID}`,
		headers: {
			'Accept': "application/json",
		}
	}

	request(options, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			callback(data);
		} else {
			callback([]);
			//console.log("Problem getting events for artist from bandsInTown");
			//console.log(error);
			//console.log(response);
		}
	});
}