let map;
const artistEntries = Array.from(document.querySelectorAll('.artistEntry'));
const artistDetail = document.querySelector('#artistDetail');
const elevationClasses = ['mdc-elevation-transition', 'mdc-elevation--z20'];

function createGridListEntry(titleText, imageURL) {
	const entry = document.createElement('li');
	entry.classList.add('mdc-grid-tile');
	const imageDiv = document.createElement('div');
	imageDiv.classList.add("mdc-grid-tile__primary");
	const image = document.createElement("img");
	image.setAttribute('src', imageURL);
	image.classList.add("mdc-grid-tile__primary-content");
	imageDiv.appendChild(image);
	entry.appendChild(imageDiv);

	const titleSpan = document.createElement('span');
	titleSpan.classList.add("mdc-grid-tile__secondary");
	const title = document.createElement('span');
	title.classList.add("mdc-grid-tile__title");
	title.innerHTML = titleText;
	titleSpan.appendChild(title);
	entry.appendChild(titleSpan);
	return entry;
}

function generateArtistDetailEntry(artist) {
	console.log(artist);
	while (artistDetail.firstChild) {
		artistDetail.removeChild(artistDetail.firstChild);
	}
	const title = document.createElement('p');
	title.innerHTML = artist.name;
	title.classList.add('mdc-typography--headline');
	artistDetail.appendChild(title);
	if (artist.description && artist.description != "") {
		const description = document.createElement('p');
		description.innerHTML = artist.description;
		artistDetail.appendChild(description);
	}
	const otherInfos = document.createElement('p');
	otherInfos.classList.add('mdc-typography--headline');
	otherInfos.innerHTML = `${artist.country || "Unknown country"} - ${artist.year || "Unknown year"}`;
	artistDetail.appendChild(otherInfos);
	if (artist.genres.length != 0) {
		const genres = document.createElement('p');
		genres.classList.add('mdc-typography--headline');
		genres.innerHTML = "Genres";
		const genreDiv = document.createElement('div');
		genreDiv.classList.add("mdc-grid-list");
		const genreList = document.createElement('ul');
		genreList.classList.add('mdc-grid-list__tiles');
		genreDiv.appendChild(genreList);
		artist.genres.forEach(g => {
			const gEntry = createGridListEntry(g, '/assets/default-artist.png');
			genreList.appendChild(gEntry);
		});
		artistDetail.appendChild(genres);
		artistDetail.appendChild(genreDiv);
	}

	if (artist.followers || artist.facebook != "") {
		const social = document.createElement('p');
		social.classList.add("mdc-typography--headline");
		social.innerHTML = "Social";
		artistDetail.appendChild(social);

		const socialDiv = document.createElement('div');
		socialDiv.classList.add("mdc-grid-list");
		const socialList = document.createElement('ul');
		socialList.classList.add('mdc-grid-list__tiles');
		socialDiv.appendChild(socialList);


		if (artist.facebook != "") {
			const fbLink = document.createElement('a');
			fbLink.setAttribute('href', artist.facebook);
			const fbEntry = createGridListEntry('Facebook page', '/assets/fb.png');
			fbLink.appendChild(fbEntry);
			socialList.appendChild(fbLink);
		}

		if (artist.followers) {
			socialList.appendChild(createGridListEntry(`${artist.followers} Followers`, '/assets/spotify.png'));
		}


		artistDetail.appendChild(socialDiv);
	}


}


artistEntries.forEach(entry => {
	entry.addEventListener('click', function () {
		console.log(this.dataset.artist);
		const req = new Request(`${baseURL}/artist/${this.dataset.artist}/infos`);
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
	const req = new Request(`${baseURL}/artist/${artist}/picture`);
	fetch(req)
		.then(body => body.json())
		.then(data => {
			console.log(data);
			img.style.backgroundImage = `url(${data.picture || "/assets/default-artist.png"})`;
		}).catch(e => console.warn(e));
});