const bit = require('./bandsintown');
const musicbrainz = require('./musicbrainz');
const spotify = require('./spotify');

exports.getSingleArtistInfos = (artistName, callback) => {
	bit.getSingleArtist(artistName, (bitData) => {
		spotify.getArtist(artistName, (spotifyData) => {
			function sendWithBrainzData(brainz) {
				if (!brainz || !spotifyData || !bitData) {
					callback(null);
					return;
				}
				const artist = {
					'name': bitData.name,
					'country': brainz.country,
					'year': brainz["life-span"].begin,
					'genres': spotifyData.genres,
					'description': brainz.disambiguation,
					'followers': spotifyData.followers.total,
					'facebook': bitData.facebook_page_url,
				}
				callback(artist);
			}

			if (!bitData || bitData.mbid == "" || bitData.mbid == null) {
				musicbrainz.getArtistByName(artistName, sendWithBrainzData);
			} else {
				musicbrainz.getArtistByID(bitData.mbid, sendWithBrainzData);
			}

		});
	});
}

exports.getArtistSong = (artistName, callback) => {
	spotify.getSongForArtist(artistName, (data) => {
		callback(data);
	});
}

exports.getArtistPicture = (artistName, callback) => {
	spotify.getPictureForAnArtist(artistName, (data) => {
		callback(data);
	});
}