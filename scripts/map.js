let map;
let markers = [];
const stopButton = document.querySelector('#stopButton');

stopButton.addEventListener('click', () => {
    const previewAudio = document.querySelector('#preview');
    previewAudio.pause();
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        map.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
    });
}

function degreesToRadians(degreeValue) {
    return degreeValue * Math.PI / 180;
}

function eventOver() {
    this.popup.open(map, this);
    const request = new Request(`events/${this.event_id}/song`);
    const previewAudio = document.querySelector('#preview');
    fetch(request).then((response) => response.json()).then(data => {
        console.log(JSON.stringify(data));
        const songTitle = document.querySelector('#songTitle');
        const songArtists = document.querySelector('#songArtists');
        const songCover = document.querySelector('#songCover');
        songTitle.innerHTML = data.title;
        songArtists.innerHTML = data.artists.join(", ");
        songCover.style.backgroundImage = `url(${data.cover_img})`;
        previewAudio.src = data.preview_link;
        previewAudio.load();
        previewAudio.play();
    });
}


function eventClick() {
    window.location.href = `/events/${this.event_id}/detail`;
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
    const bar = document.querySelector('#progressBar');
    bar.classList.add('mdc-linear-progress--indeterminate');
    fetch(request).then((response) => response.json()).then((data) => {
        bar.classList.remove('mdc-linear-progress--indeterminate');
        console.log(data);
        data.forEach((element) => {
            if (!markers.find(marker => marker.position.lat == element.position.lat && marker.position.lng == element.position.lng)) {
                let marker = new google.maps.Marker({
                    "position": element.position,
                    "map": map,
                });
                marker.event_id = element.id;
                marker.event_name = element.name;
                marker.event_venue = element.venue_name;
                marker.popup = new google.maps.InfoWindow({
                    content: `${marker.event_name} @${marker.event_venue}`,
                });
                marker.addListener('mouseover', eventOver);
                marker.addListener('mouseout', function () {
                    this.popup.close();
                });
                marker.addListener('click', eventClick)
                markers.push(marker);
            }
        });
    });

}


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 46.20949, lng: 6.135212 }
    });

    map.addListener('idle', mapMoved);
}