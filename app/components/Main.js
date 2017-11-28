import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import Playlists from './Playlists';
import Playlist from './Playlist';
import Account from './Account';
import About from './About';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/playlists' component={Playlists}/>
      <Route exact path='/playlists/:id' component={Playlist}/>
      <Route path='/about' component={About}/>
      <Route path='/account' component={Account}/>
    </Switch>
  </main>
)

export default Main;
