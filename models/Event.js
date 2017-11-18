const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const eventSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	venue_name: {
		type: String,
		trim: true,
	},
	position: {
		lat: Number,
		lng: Number,
	},
	lineup: [String],
	id: {
		type: Number,
		required: true,
	},
	date: {
		type: String,
		trim: true,
	},
	description: String,
	ticketshop: String,
});

module.exports = mongoose.model('Event', eventSchema);