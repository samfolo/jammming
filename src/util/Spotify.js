let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      const redirectURI = 'http://localhost:3000/';
      window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }

    return accessToken;
  },

  search(searchTerm) {
    const headers = { headers: { 'Authorization': `Bearer ${this.getAccessToken()}` } };
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, headers)
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      const results = jsonResponse.tracks.items.map(track => {
        return ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        });
      });

      return results;
    });
  }
}

export default Spotify;
