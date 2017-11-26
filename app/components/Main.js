import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import Playlists from './Playlists';
import Account from './Account';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/playlists' component={Playlists}/>
      <Route path='/account' component={Account}/>
    </Switch>
  </main>
)

export default Main;
