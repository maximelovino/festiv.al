const searchBar = document.querySelector('#searchBar');
const dropdown = new google.maps.places.Autocomplete(searchBar);

dropdown.addListener('place_changed', () => {
	const place = dropdown.getPlace();
	console.log(place);
	if (!place.geometry) {
		console.warn("The place doesn't have geometry infos");
		return;
	}

	if (place.geometry.viewport) {
		map.fitBounds(place.geometry.viewport);
	} else {
		map.setCenter({ 'lat': place.geometry.location.lat(), 'lng': place.geometry.location.lng() });
		map.setZoom(17);
	}
});