let map;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        map.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
    });
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 0, lng: 0 }
    });
    let epflMarker = new google.maps.Marker({
        position: { lat: 46.5189902, lng: 6.5654067 },
        map: map,
    });

    let hepiaMarker = new google.maps.Marker({
        position: { lat: 46.2094937, lng: 6.133018 },
        map: map,
    });

}