let map;
const baseURLDetail = "http://localhost:3000";
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
			img.src = data.picture;
		});
});