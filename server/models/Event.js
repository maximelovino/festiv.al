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
		type: String,
		required: true,
	},
	date: {
		type: String,
		trim: true,
	},
	description: String,
	ticketshop: String,
	created: {
		type: Date,
		default: Date.now,
		expires: 24 * 3600,
	},
});

module.exports = mongoose.model('Event', eventSchema);