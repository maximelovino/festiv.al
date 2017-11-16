const request = require('request');
const userAgent = "Festiv.al/1.0 (maxime-alexandre.lovino@etu.hesge.ch)"

exports.getArtistByID = (mbid, callback) => {
	const options = {
		method: 'GET',
		url: `http://musicbrainz.org/ws/2/artist/${mbid}?fmt=json`,
		headers: {
			'User-Agent': userAgent,
		}
	}

	request(options, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			callback(data);
		} else {
			console.log("Problem getting events for artist from bandsInTown");
			console.log(error);
			console.log(response);
		}
	})
};

exports.getArtistByName = (artistName, callback) => {
	const options = {
		method: 'GET',
		url: `http://musicbrainz.org/ws/2/artist/?query=artist:${artistName}&fmt=json`,
		headers: {
			'User-Agent': userAgent,
		},
	}

	request(options, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			const firstResult = data.artists[0];
			callback(firstResult);
		} else {
			console.log("Problem getting events for artist from bandsInTown");
			console.log(error);
			console.log(response);
		}
	})
}