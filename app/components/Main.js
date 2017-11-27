import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import Playlists from './Playlists';
import Account from './Account';
import About from './About';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/playlists' component={Playlists}/>
      <Route path='/about' component={About}/>
      <Route path='/account' component={Account}/>
    </Switch>
  </main>
)

export default Main;
