let map;
const artistEntries = Array.from(document.querySelectorAll('.artistEntry'));
const artistDetail = document.querySelector('#artistDetail');
const baseURLDetail = "http://localhost:3000";
const elevationClasses = ['mdc-elevation-transition', 'mdc-elevation--z20'];

function generateArtistDetailEntry(artist) {
	console.log(artist);
	while (artistDetail.firstChild) {
		artistDetail.removeChild(artistDetail.firstChild);
	}
	const title = document.createElement('p');
	title.innerHTML = artist.name;
	title.classList.add('mdc-typography--headline');
	artistDetail.appendChild(title);
	const otherInfos = document.createElement('p');
	otherInfos.classList.add('mdc-typography--headline');
	otherInfos.innerHTML = `${artist.country || "Unknown country"} - ${artist.year || "Unknown year"}`;
	artistDetail.appendChild(otherInfos);
	if (artist.genres.length != 0) {
		const genres = document.createElement('p');
		genres.classList.add('mdc-typography--headline');
		genres.innerHTML = "Genres";
		const genreList = document.createElement('ul');
		genreList.classList.add('mdc-list');
		artist.genres.forEach(g => {
			const gEntry = document.createElement('li');
			gEntry.classList.add('mdc-list-item');
			gEntry.innerHTML = g;
			genreList.appendChild(gEntry);
		});
		artistDetail.appendChild(genres);
		artistDetail.appendChild(genreList);
	}

	if (artist.facebook != "") {
		const fbLink = document.createElement('a');
		fbLink.setAttribute('href', artist.facebook);
		const fbImage = document.createElement('img');
		fbImage.setAttribute('src', "/assets/fb.png");
		fbLink.appendChild(fbImage);
		fbLink.classList.add("social-link");
		artistDetail.appendChild(fbLink);
	}
}


artistEntries.forEach(entry => {
	entry.addEventListener('click', function () {
		console.log(this.dataset.artist);
		const req = new Request(`${baseURLDetail}/artist/${this.dataset.artist}/infos`);
		artistEntries.forEach(a => elevationClasses.forEach(cl => a.classList.remove(cl)));
		elevationClasses.forEach(cl => this.classList.add(cl));
		fetch(req).then(body => body.json()).then(data => {
			generateArtistDetailEntry(data);
		}).catch(e => console.warn(e));
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
		}).catch(e => console.warn(e));
});