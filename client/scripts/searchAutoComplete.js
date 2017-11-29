const searchBar = document.querySelector('#searchBar');
const dropdown = new google.maps.places.Autocomplete(searchBar);

dropdown.addListener('place_changed', () => {
	const place = dropdown.getPlace();
	map.setCenter({ 'lat': place.geometry.location.lat(), 'lng': place.geometry.location.lng() })
	console.log(place.geometry.location.lat(), place.geometry.location.lng());
});