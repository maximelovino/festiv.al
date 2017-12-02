const stopButton = document.querySelector('#stopButton');
const baseURL = "http://localhost:3000";
const previewAudio = document.querySelector('#preview');
let isPaused = true;

stopButton.addEventListener('click', () => {
	if (isPaused) {
		startPlayer();
	} else {
		pausePlayer();
	}
});

previewAudio.addEventListener('ended', pausePlayer);

function pausePlayer() {
	isPaused = true;
	previewAudio.pause();
	stopButton.innerHTML = "Play the music";
}

function startPlayer() {
	isPaused = false;
	previewAudio.load();
	previewAudio.play();
	stopButton.removeAttribute('disabled');
	stopButton.innerHTML = "Stop the music";
}

function songFetched(data) {
	const songTitle = document.querySelector('#songTitle');
	const songArtists = document.querySelector('#songArtists');
	const songCover = document.querySelector('#songCover');
	songTitle.innerHTML = data.title;
	songArtists.innerHTML = data.artists.join(", ");
	songCover.style.backgroundImage = `url(${data.cover_img})`;
	previewAudio.src = data.preview_link;
	startPlayer();
}