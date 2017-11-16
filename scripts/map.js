let map;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        map.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
    });
}

function degreesToRadians(degreeValue) {
    return degreeValue * Math.PI / 180;
}

function eventOver() {
    console.log(this);
    const request = new Request(`/artist/${this.event_id}/song`);
    const previewAudio = document.querySelector('#preview');
    console.log(request);
    fetch(request).then((response) => response.json()).then(data => {
        console.log(data);
        previewAudio.src = data.preview_link;
        previewAudio.load();
        previewAudio.play();
    });
}

function mapMoved() {
    const bounds = this.getBounds();

    const center = bounds.getCenter();
    const ne = bounds.getNorthEast();

    // r = radius of the earth in statute miles
    const r = 3963.0;

    // Convert lat and lng from decimal degrees into radians
    const lat1 = degreesToRadians(center.lat());
    const lon1 = degreesToRadians(center.lng());
    const lat2 = degreesToRadians(ne.lat());
    const lon2 = degreesToRadians(ne.lng());

    // distance = circle radius from center to Northeast corner of bounds
    const dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
    //dis contains the radius shown on the map in miles
    console.log(`${dis} miles`);
}


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 0, lng: 0 }
    });

    map.addListener('bounds_changed', mapMoved);


    let epflMarker = new google.maps.Marker({
        position: { lat: 46.5189902, lng: 6.5654067 },
        map: map,
    });
    //the event id is an artist for now, just for testing purposes
    epflMarker.event_id = "Muse";

    epflMarker.addListener('mouseover', eventOver);

    let hepiaMarker = new google.maps.Marker({
        position: { lat: 46.2094937, lng: 6.133018 },
        map: map,
    });

    hepiaMarker.event_id = "Linkin Park";
    hepiaMarker.addListener('mouseover', eventOver);

}