import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  renderAction() {
    return this.props.isRemoval ? '-' : '+';
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemoval(this.props.track);
  }

  handleClick() {
    if (this.props.isRemoval) {
      this.removeTrack();
    } else {
      this.addTrack();
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{ this.props.track.name }</h3>
          <p>{ this.props.track.artist } | { this.props.track.album }</p>
        </div>
        <button className="Track-action" onClick={this.handleClick}>{ this.renderAction() }</button>
      </div>
    );
  }
}

export default Track;
