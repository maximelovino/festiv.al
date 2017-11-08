let map;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        map.setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude})
    });
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 0, lng: 0}
    });
}