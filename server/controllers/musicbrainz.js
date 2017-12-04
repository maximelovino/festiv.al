const request = require('request-promise-native');
const userAgent = "Festiv.al/1.0 (maxime-alexandre.lovino@etu.hesge.ch)"
const log = require('winston');

exports.getArtistByID = (mbid, callback) => {
	const options = {
		method: 'GET',
		url: `http://musicbrainz.org/ws/2/artist/${mbid}?fmt=json`,
		headers: {
			'User-Agent': userAgent,
		},
		json: true,
	}
	request(options).then(data => callback(data)).catch(error => {
		log.warn("Problem getting events for artist from bandsInTown");
		callback(null);
		log.warn(error);
	});
};

exports.getArtistByName = (artistName, callback) => {
	const options = {
		method: 'GET',
		url: `http://musicbrainz.org/ws/2/artist/?query=artist:${artistName}&fmt=json`,
		headers: {
			'User-Agent': userAgent,
		},
		json: true,
	}

	request(options).then(data => {
		if (data.artists && data.artists[0]) {
			callback(data.artists[0]);
		} else {
			callback(null);
		}
	}).catch(error => {
		log.warn("Problem getting events for artist from bandsInTown");
		log.warn(error);
		callback(null);
	});
}