import React from 'react';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const trackIds = this.state.playlistTracks.map(track => track.id );
    if (!trackIds.includes(track.id)) {
      this.setState({ playListTracks: this.state.playlistTracks.push(track) });
    }
  }

  removeTrack(track) {
    const trackIds = this.state.playlistTracks.map(track => track.id );
    const indexOfrackToDelete = this.state.playlistTracks.indexOf(track);
    if (trackIds.includes(track.id)) {
      this.setState({ playListTracks: this.state.playlistTracks.splice(indexOfrackToDelete, 1) });
    }
  }

  updatePlaylistName(newName) {
    this.setState({ playlistName: newName });
  }

  savePlaylist(playlistName, playlistTracks) {
    Spotify.savePlaylist(playlistName, playlistTracks);
    this.setState({ 
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm)
    .then(searchResults => this.setState({ searchResults: searchResults }));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistTracks={this.state.playlistTracks}
              playlistName={this.state.playlistName}
              onNameChange={this.updatePlaylistName}
              onRemoval={this.removeTrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
