const EARTH_RADIUS_MILES = 3959.0;

const degreesToRadians = (degreeValue) => {
	return degreeValue / 180 * Math.PI;
}

exports.getRadius = (swLat, swLng, neLat, neLng) => {
	const deltaLatRad = degreesToRadians(swLat - neLat);
	const deltaLonRad = degreesToRadians(swLng - neLng);
	const neLatRad = degreesToRadians(neLat);
	const neLngRad = degreesToRadians(neLng);
	const swLatRad = degreesToRadians(swLat);
	const swLngRad = degreesToRadians(swLng);

	let a = Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) + Math.cos(neLatRad) * Math.cos(swLatRad) * Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return EARTH_RADIUS_MILES * c / 2;
}