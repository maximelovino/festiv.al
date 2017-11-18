const mongoose = require('mongoose')
const eventful = require('./eventful');
const bit = require('./bandsintown');
const uuid = require('uuid');
const Event = mongoose.model('Event');
const artists = require('./artists');

exports.getEventsWithLocationAndRadius = (lat, lng, radius, callback) => {
	eventful.getEventsWithLocationAndRadius(lat, lng, radius, (data) => {
		const eventfulDataWithPerformers = data.filter(d => d.performers !== null);
		//So here, we have a list of events from eventful that contains performers
		//For each of these, we can try to match with the sameEvent on bandsInTown for the performer
		//And then match with the venue name for example and the date, so then we can add bands in town info
		matchEventsFromEventfulWithBandsInTown(eventfulDataWithPerformers, (allData) => {
			const dataToSend = allData.map(d => {
				let lineup = [];
				if (Array.isArray(d.performers.performer)) {
					lineup = d.performers.performer.map(p => p.name);
				} else {
					lineup.push(d.performers.performer.name);
				}

				const date = d.start_time.substr(0, 10);

				let ticketLink = "";

				if (d.bitData) {
					const entry = d.bitData.offers.find(el => el.type === "Tickets");
					if (entry){
						ticketLink = entry.url;
					}else{
						ticketLink = "";
					}
				}

				return {
					"name": d.title,
					"venue_name": d.venue_name,
					"position": {
						"lat": parseFloat(d.latitude),
						"lng": parseFloat(d.longitude),
					},
					"lineup": lineup,
					"id": uuid.v4(),
					"date": date,
					"description": d.description || "",
					"ticketshop": ticketLink,
				};
			});
			callback(dataToSend);
			//DB insertion
			dataToSend.forEach(d => {
				(new Event(d)).save().then((e) => {
					console.log("Insertion alright");
				}).catch(error => {
					console.log("There was a problem with inserting into the DB");
					console.log(error);
				});
			});
		});
	});
};

function matchEventsFromEventfulWithBandsInTown(eventfulData, callback) {
	let fullDataArray = [];
	if (eventfulData.length == 0) {
		callback(fullDataArray);
	}
	eventfulData.forEach(event => {
		matchOneEvent(event, (data) => {
			fullDataArray.push(data);
			if (fullDataArray.length == eventfulData.length) {
				callback(fullDataArray);
			}
		});
	});
}


function matchOneEvent(event, callback) {
	let performerName = "";
	if (Array.isArray(event.performers.performer)) {
		performerName = event.performers.performer[0].name;
	} else {
		performerName = event.performers.performer.name;
	}
	if (performerName == "") {
		callback(event);
	}
	bit.getEventsForArtist(performerName, (bitData) => {
		if (bitData.length !== 0) {
			//TODO we should match on date as well as venue
			const bitEvent = bitData.find(e => e.venue.name.toLowerCase() == event.venue_name.toLowerCase());
			if (bitEvent) {
				event.bitData = bitEvent
			}
			callback(event);
		} else {
			callback(event);
		}
	});
}

exports.getSongForEvent = async (id, callback) => {
	const event = await Event.findOne({id});
	if (!event){
		callback({})
		return;
	}

	const lineup = event.lineup;

	const artist = event.lineup[Math.floor(Math.random() * event.lineup.length)];

	artists.getArtistSong(artist, (song) => {
		callback(song);
	});
}