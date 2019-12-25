import React from 'react';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'I Win You Lose',
          album: 'All The Sweetness On the Surface',
          artist: 'XamVolo',
          id: 1
        }, 
        {
          name: 'Alive',
          album: 'All The Sweetness On The Surface',
          artist: 'XamVolo',
          id: 2
        }
      ],
      playlistName: 'The Best Playlist',
      playlistTracks: [
        {
          name: 'Lose Love',
          album: 'All The Sweetness On The Surface',
          artist: 'XamVolo',
          id: 3
        },
        {
          name: 'The Slaize Interlude',
          album: 'All The Sweetness On The Surface',
          artist: 'XamVolo',
          id: 4
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    const trackIds = this.state.playlistTracks.map(track => track.id );
    if (!trackIds.includes(track.id)) {
      this.setState({ playListTracks: this.state.playlistTracks.push(track) });
      console.log(this.state.playlistTracks)
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist 
              playlistTracks={this.state.playlistTracks} 
              playlistName={this.state.playlistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
