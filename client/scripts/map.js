let map;
let markers = [];
let clusterer;
let markerSpiderfier;
const defaultPosition = { lat: 46.20949, lng: 6.135212 };
const initialZoom = 10;
let runningRequests = 0;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        map.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
    });
}

function eventOver() {
    this.popup.open(map, this);
    const request = new Request(`${baseURL}/events/${this.event_id}/song`);
    const previewAudio = document.querySelector('#preview');
    console.log(request);
    fetch(request).then((response) => response.json()).then(data => {
        console.log(data);
        songFetched(data);
    }).catch(e => console.warn(e));
}


function eventClick() {
    window.location.href = `/events/${this.event_id}/detail`;
}

function putDataOnMap(data) {
    data.forEach((element) => {
        //this the duplicate marker check
        if (!markers.find(marker => marker.event_id == element.id)) {
            let marker = new google.maps.Marker({
                "position": element.position,
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
            google.maps.event.addListener(marker, 'spider_click', eventClick);
            //So a marker is in 3 places:
            //1. In our array of markers
            //2. In the marker spiderfier
            //3. In the clusterer (that's how it's shown in the map)
            markers.push(marker);
            markerSpiderfier.addMarker(marker);
            clusterer.addMarker(marker);
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
    //2. Query the live data
    //3. Let our data on map function handle the doubles
    const requestURL = `${baseURL}/events/location/${center.lat()}/${center.lng()}/${sw.lat()}/${sw.lng()}/${ne.lat()}/${ne.lng()}`;
    const request = new Request(requestURL);
    runningRequests++;
    const bar = document.querySelector('#progressBar');
    bar.classList.add('mdc-linear-progress--indeterminate');
    fetch(request).then((response) => response.json()).then((data) => {
        runningRequests--;
        if (runningRequests == 0)
            bar.classList.remove('mdc-linear-progress--indeterminate');
        console.log(data);
        putDataOnMap(data);
    }).catch(e => console.warn(e));

    const requestCached = new Request(requestURL + "/cached");
    fetch(requestCached).then(response => response.json()).then(data => putDataOnMap(data)).catch(e => console.warn(e));
}


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: initialZoom,
        center: defaultPosition,
    });

    markerSpiderfier = new OverlappingMarkerSpiderfier(map, {
        markersWontMove: true,
        markersWontHide: true,
        basicFormatEvents: true
    });


    clusterer = new MarkerClusterer(map, markers, { imagePath: '/assets/markers/m' });
    clusterer.setMaxZoom(15);
    map.addListener('idle', mapMoved);
}