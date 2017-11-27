let map;
let markers = [];
const stopButton = document.querySelector('#stopButton');
const baseURL = "http://localhost:3000";

stopButton.addEventListener('click', () => {
    const previewAudio = document.querySelector('#preview');
    previewAudio.pause();
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        map.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
    });
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

function putDataOnMap(data) {
    data.forEach((element) => {
        //this the duplicate marker check
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
}

function mapMoved() {
    const bounds = map.getBounds();
    const center = bounds.getCenter();
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    console.log(`${center.lat()},${center.lng()}`);
    //Here we should do something like this:
    //1. Query the cache
    //2. Query the live data => live data goes in DB as well, so it has to be though server side as well...perhaps use a more representative ID, like a hash of the events data, so we prevent double insertion of same event?
    //3. Let our data on map function handle the doubles
    const requestURL = `${baseURL}/events/location/${center.lat()}/${center.lng()}/${sw.lat()}/${sw.lng()}/${ne.lat()}/${ne.lng()}`;
    const request = new Request(requestURL);
    const bar = document.querySelector('#progressBar');
    bar.classList.add('mdc-linear-progress--indeterminate');
    fetch(request).then((response) => response.json()).then((data) => {
        bar.classList.remove('mdc-linear-progress--indeterminate');
        console.log(data);
        putDataOnMap(data);
    });

    const requestCached = new Request(requestURL + "/cached");
    fetch(requestCached).then(response => response.json()).then(data => putDataOnMap(data));
}


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 46.20949, lng: 6.135212 }
    });

    map.addListener('idle', mapMoved);
}