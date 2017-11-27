import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div className="home">      
        <div id="login">
          <h1>playlist.pictures</h1>
          <p>Generate a pic for your playlist!</p>
          <a href="/login" className="btn btn-primary">Log in with Spotify</a>
        </div>
      </div>
    );
  }
}
