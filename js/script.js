const user = "";// LastFm User id
const api_key = '';//Add your API KEY
const limit = '5';
const page = "1";

// Create status message element
function createStatusMessage() {
    const statusDiv = document.createElement('div');
    statusDiv.id = 'status-message';
    document.body.insertBefore(statusDiv, document.getElementById('track'));
    return statusDiv;
}

function showMessage(message, isError = false) {
    const statusDiv = document.getElementById('status-message') || createStatusMessage();
    statusDiv.textContent = message;
    statusDiv.className = isError ? 'error' : 'success';
}

async function getLastFm() {
    // Validate API key and user
    if (!api_key) {
        showMessage('Error: Please add your Last.fm API key in the configuration', true);
        return;
    }

    if (!user) {
        showMessage('Error: Please add your Last.fm username in the configuration', true);
        return;
    }

    const api_url = `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${user}&api_key=${api_key}&limit=${limit}&page=${page}&format=json`;

    try {
        showMessage('Loading tracks...');
        const response = await fetch(api_url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const Data = await response.json();

        if (Data.error) {
            throw new Error(Data.message || 'Last.fm API error');
        }

        const totalPages = Data.recenttracks['@attr'].totalPages;
        const total = Data.recenttracks['@attr'].total;
        const track = Data.recenttracks.track;

        showMessage(`Successfully loaded ${total} tracks`);
        renderTracks(track);

    } catch (error) {
        showMessage(`Error: ${error.message}`, true);
        console.error('Error:', error);
    }
}

function renderTracks(tracks) {
    const trackContainer = document.getElementById("track");
    trackContainer.innerHTML = ''; // Clear existing tracks

    tracks.forEach((trackDetails, index) => {
        const trackInfo = createTrackElement(trackDetails, index + 1);
        trackContainer.appendChild(trackInfo);
    });
}

function createTrackElement(trackDetails, trackNumber) {
    const trackInfo = document.createElement('div');
    trackInfo.classList.add('trackInfo');

    // Handle "Now Playing" status
    const isNowPlaying = trackDetails['@attr']?.nowplaying;
    
    // Create track elements
    const elements = {
        art: createTrackArt(trackDetails),
        name: createTextElement('trackName', trackDetails.name),
        artist: createTextElement('trackArtist', trackDetails.artist['#text']),
        album: createTextElement('trackAlbum', trackDetails.album['#text']),
        page: createTrackLink(trackDetails)
    };

    // Add "Now Playing" indicator
    if (isNowPlaying) {
        const nowPlaying = createTextElement('nowPlaying', '▶ Now Playing');
        trackInfo.appendChild(nowPlaying);
    }

    // Append all elements
    Object.values(elements).forEach(element => trackInfo.appendChild(element));

    return trackInfo;
}

function createTextElement(className, text) {
    const element = document.createElement('div');
    element.classList.add(className);
    element.textContent = text;
    return element;
}

function createTrackArt(trackDetails) {
    const artDiv = document.createElement('div');
    artDiv.classList.add('trackArt');
    
    const image = trackDetails.image.find(img => img.size === 'extralarge');
    if (image && image['#text']) {
        const img = document.createElement('img');
        img.src = image['#text'];
        img.alt = trackDetails.name;
        artDiv.appendChild(img);
    }
    
    return artDiv;
}

function createTrackLink(trackDetails) {
    const linkDiv = document.createElement('div');
    linkDiv.classList.add('trackPage');
    
    const link = document.createElement('a');
    link.href = trackDetails.url;
    link.target = '_blank';
    link.textContent = `${trackDetails.name} - ${trackDetails.artist['#text']}`;
    
    linkDiv.appendChild(link);
    return linkDiv;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', getLastFm);