let map;
let markers = [];
const defaultArtists = ["Pink Floyd", "Muse", "Linkin Park", "Dire Straits", "Eminem", "Imagine Dragons"];
let events = [];

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
        const bar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
        const dataObj = {
            message: `${data.title} - ${data.artists.join(", ")}`,
            timeout: 20000,
        };

        bar.show(dataObj);
        previewAudio.src = data.preview_link;
        previewAudio.load();
        previewAudio.play();
    });
}

function mapMoved() {
    const bounds = map.getBounds();

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
    console.log(`${center.lat()},${center.lng()} => ${dis} miles`);
    const request = new Request(`/events/location/${center.lat()}/${center.lng()}/${dis}`);

    fetch(request).then((response) => response.json()).then((data) => {
        console.log(data);
        events = data;
        markers.forEach(m => m.setMap(null));
        markers = [];
        data.forEach((element, index) => {
            let marker = new google.maps.Marker({
                "position": element.position,
                "map": map,
            });
            marker.event_id = defaultArtists[index % defaultArtists.length];
            marker.addListener('mouseover', eventOver);
            markers.push(marker);
        });
    });

}


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 0, lng: 0 }
    });

    map.addListener('idle', mapMoved);
}