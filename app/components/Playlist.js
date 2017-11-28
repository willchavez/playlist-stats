import React from 'react';

export default class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      tracks: [],
      track_ids: []
    };
  }
  componentDidMount() {
    this.setState({
      id: this.props.location.pathname.substring(11),
    });

    fetch('http://localhost:8888/getPlaylistTracks?id=' + this.props.location.pathname.substring(11), {
      credentials: 'same-origin'
    })
    .then((response) => {
      return response.json();      
    })
    .then((data) => {
      console.log(data);
      this.setState({
        tracks: data.items
      })
      var trackIds = [];
      for (let i = 0; i < data.items.length; i++) {
        trackIds.push(data.items[i].track.id)
      }
      this.setState({
        track_ids: trackIds
      }, function() {
        console.log(this.state.track_ids);
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Playlist</h1>
        <button>
          Tone Analysis
        </button>
        <div>
          {this.state.tracks.length > 0 ?
            (this.state.tracks).map((track, i) => (
              <div className="playlist-tile grow" key={i}>
                <div className="inline-row playlist-image-tile-row">
                  <img src={ track.track.album.images[0].url } height="50px" width="50px" className="playlist-image-tile" />
                </div>
                <div className="inline-row playlist-name">
                  { track.track.name }
                </div>
              </div>
            )) : null
          }
        </div>
      </div>
    );
  }

  _getTrackFeatures() {

  }
}
