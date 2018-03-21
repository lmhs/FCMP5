import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import PostsCreator from '../PostsCreator/';
import Login from '../../components/Login';

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={PostsCreator}/>
        <Route exact path="/login" component={Login}/>
      </div>
    )
  }
}