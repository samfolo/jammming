import React from 'react';
import TrackList from '../TrackList/TrackList'
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value)
  }

  handleClick() {
    this.props.onSave(this.props.playlistName, this.props.playlistTracks);
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.handleNameChange} />
        <TrackList 
          tracks={this.props.playlistTracks}
          onRemoval={this.props.onRemoval}
          isRemoval={true} 
        />
        <button className="Playlist-save" onClick={this.handleClick}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;
