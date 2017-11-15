const bit = require('./bandsintown');
const musicbrainz = require('./musicbrainz');
const spotify = require('./spotify');

exports.getSingleArtistInfos = (artistName, callback) => {
	bit.getSingleArtist(artistName, (bitData) => {
		//TODO check because MBID can be null
        musicbrainz.getSingleArtist(bitData.mbid, (brainz) => {
			spotify.getArtist(artistName, (spotifyData) => {
				console.log(spotifyData);
				console.log("------");
				console.log(brainz);
				console.log("-----");
				console.log(bitData)
				const artist = {
					'name': bitData.name,
					'country': brainz.country,
					'year': brainz["life-span"].begin,
					'genres': spotifyData.genres,
					'description': brainz.disambiguation,
					'followers': spotifyData.followers,
					'facebook': bitData.facebook_page_url,
				}
				callback(artist);
			});
        });
    });
}