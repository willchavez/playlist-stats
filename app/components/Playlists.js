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
      <div>
        <div>Playlists</div>
        <div>
          {this.state.playlists ?
            (this.state.playlists).map((playlist, i) => (
              <div className="playlist-tile">
                { playlist.name }
              </div>
            )) : null
          }
        </div>
      </div>
    );
  }
}
