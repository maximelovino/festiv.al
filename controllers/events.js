const eventful = require('./eventful');

exports.getEventsWithLocationAndRadius = (lat,lng, radius, callback) => {
	eventful.getEventsWithLocationAndRadius(lat,lng,radius, (data) => {
		callback(data);
	});
}