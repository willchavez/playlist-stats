import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div>      
        <div id="login">
          <h1>This is an example of the Authorization Code flow</h1>
          <a href="/login" className="btn btn-primary">Log in with Spotify</a>
        </div>
        <div id="loggedin">
          <div id="user-profile">
          </div>
          <div id="oauth">
          </div>
          <button className="btn btn-default" id="obtain-new-token">Obtain new token using the refresh token</button>
        </div>
        <div id="playlists">
          <a href="/playlists" className="btn btn-primary">Playlists</a>
        </div>
      </div>
    );
  }
}
