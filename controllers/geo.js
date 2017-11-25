const EARTH_RADIUS_MILES = 3963.0;

const degreesToRadians = (degreeValue) => {
	return degreeValue * Math.PI / 180;
}

exports.getRadius = (swLat, swLng, neLat, neLng) => {
	//${sw.lat()}/${sw.lng()}/${ne.lat()}/${ne.lng()}
	// Convert lat and lng from decimal degrees into radians
	const lat1 = degreesToRadians(swLat);
	const lon1 = degreesToRadians(swLng);
	const lat2 = degreesToRadians(neLat);
	const lon2 = degreesToRadians(neLng);

	// distance = circle radius from center to Northeast corner of bounds
	const diameter = EARTH_RADIUS_MILES * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
	return diameter / 2;
}