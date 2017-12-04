const APP_ID = "FestivDotAl";
const request = require('request-promise-native');
const log = require('winston');

exports.getSingleArtist = (artistName, callback) => {
	const options = {
		method: 'GET',
		url: `https://rest.bandsintown.com/artists/${artistName}?app_id=${APP_ID}`,
		headers: {
			'Accept': "application/json",
		},
		json: true,
	}

	request(options).then(data => callback(data)).catch(error => {
		log.warn("Problem getting artist from bandsInTown");
		callback(null);
		log.warn(error)
	});
}

exports.getEventsForArtist = (artistName, callback) => {
	const options = {
		method: 'GET',
		url: `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${APP_ID}`,
		headers: {
			'Accept': "application/json",
		},
		json: true,
	}
	request(options).then(data => callback(data)).catch(error => {
		log.warn("Problem getting events for artist from bandsInTown");
		callback(null);
		log.warn(error);
	});
}