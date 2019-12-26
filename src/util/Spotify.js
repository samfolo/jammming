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
      return accessToken;
    } else {
      const redirectURI = 'https://samfolo_jammming.surge.sh';
      window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
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
  },

  savePlaylist(playlistName, playlistTracks) {
    if (playlistName && playlistTracks) {
      let accessToken = Spotify.getAccessToken();
      let headers = { 'Authorization': `Bearer ${accessToken}` };
      let trackURIArray = playlistTracks.map(track => track.uri)
      // let userID;

      fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => {
        // userID = jsonResponse.id;

        fetch(
          `https://api.spotify.com/v1/me/playlists`, 
          { 
            method: 'POST', 
            body: JSON.stringify({ name: playlistName }), 
            headers: { 'Authorization': `Bearer ${accessToken}`, 'Accept': 'application/json', 'Content-type': 'application/json' }
          }
        )
        .then(response => response.json())
        .then(jsonResponse => {
          const playlistID = jsonResponse.id;
          
          /* the error is after this point. */
          fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
            { 
              method: 'POST', 
              body: JSON.stringify({ uris: trackURIArray }), 
              headers: { 'Authorization': `Bearer ${accessToken}`, 'Accept': 'application/json', 'Content-type': 'application/json' }
            }
          )
          .then(response => response.json())
          .then(jsonResponse => console.log(jsonResponse))
        });
      });
    }
  }
}

export default Spotify;
