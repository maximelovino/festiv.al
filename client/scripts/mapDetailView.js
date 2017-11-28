let map;
const artistEntries = Array.from(document.querySelectorAll('.artistEntry'));
const artistDetail = document.querySelector('#artistDetail');
const baseURLDetail = "http://localhost:3000";

function generateArtistDetailEntry(artist) {
	console.log(artist);
	while (artistDetail.firstChild) {
		artistDetail.removeChild(artistDetail.firstChild);
	}
	const title = document.createElement('h1');
	title.innerHTML = artist.name;
	artistDetail.appendChild(title);
	if (artist.genres.length != 0) {
		const genres = document.createElement('h3');
		genres.innerHTML = "Genres";
		const genreList = document.createElement('ul');
		artist.genres.forEach(g => {
			const gEntry = document.createElement('li');
			gEntry.innerHTML = g;
			genreList.appendChild(gEntry);
		});
		artistDetail.appendChild(genres);
		artistDetail.appendChild(genreList);
	}

	if (artist.facebook != "") {
		const fbLink = document.createElement('a');
		fbLink.setAttribute('href', artist.facebook);
		fbLink.innerHTML = "<h3>Facebook page</h3>";
		artistDetail.appendChild(fbLink);
	}
}


artistEntries.forEach(entry => {
	entry.addEventListener('click', function () {
		console.log(this.dataset.artist);
		const req = new Request(`${baseURLDetail}/artist/${this.dataset.artist}/infos`);
		fetch(req).then(body => body.json()).then(data => {
			generateArtistDetailEntry(data);
		});
	});
});


function initDetailMap() {
	map = new google.maps.Map(document.getElementById('detailMap'), {
		zoom: 14,
		center: eventLocation,
	});
	setTimeout(() => {
		let marker = new google.maps.Marker({
			"position": eventLocation,
			"animation": google.maps.Animation.DROP,
			"map": map,
		});
	}, 1000);
}

lineup.forEach(artist => {
	console.log(artist);
	const img = document.querySelector(`#${artist.split(" ").join("")}`);
	const req = new Request(`${baseURLDetail}/artist/${artist}/picture`);
	fetch(req)
		.then(body => body.json())
		.then(data => {
			console.log(data);
			img.style.backgroundImage = `url(${data.picture})`;
		});
});