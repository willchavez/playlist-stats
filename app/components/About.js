import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div className="about">
        <h1>About</h1>
        <div>
          <p>
            playlist.pictures is a small project ran by me, <a href="https://twitter.com/vvcsx">William Chavez</a>.
          </p>
          <p>
            I make a lot of playlists on my <a href="https://open.spotify.com/user/wchavezsalinas">Spotify</a> and <a href="https://itunes.apple.com/profile/willchavez">Apple Music</a> accounts, and always ran into a small problem of choosing a good image for the cover.
            So I decided to try to make a little web app to help me with that process and share it with everyone.
          </p>
        </div>
      </div>
    );
  }
}
