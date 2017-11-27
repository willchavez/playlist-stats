import React from 'react';
import '../assets/style.css';
export default class Playlists extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    };
  }
  
  componentDidMount() {
    fetch('http://localhost:8888/getPlaylists', {
      credentials: 'same-origin'
    })
    .then((response) => {
      return response.json();      
    })
    .then((data) => {
      console.log(data.items);
      this.setState({
        playlists: data.items
      })
    });
  }

  render() {
    return (
      <div className="playlists">
        <h1>Playlists</h1>
        <div>
          {this.state.playlists ?
            (this.state.playlists).map((playlist, i) => (
              <div className="playlist-tile" key={i}>
                <div className="inline-row">
                  <img src={ playlist.images[0].url } height="50px" width="50px" className="playlist-image-tile" />
                </div>
                <div className="inline-row playlist-name">
                  { playlist.name }
                </div>
              </div>
            )) : null
          }
        </div>
      </div>
    );
  }
}
