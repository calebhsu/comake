import React from 'react';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

import Canvas from './components/canvas/Canvas';
import Home from './components/home/Home';
import Landing from './components/landing/Landing';
import MainLayout from './components/MainLayout';

import { isLoggedIn } from './helpers/LoginHelper.jsx';

/**
 * Defines routes for all application components.
 * @returns {HTML} The application components and corresponding paths.
 */
function Routes() {
  return (
    <Router history={hashHistory}>
      <Route path="/login" component={Landing} />
      <Route path="/" component={MainLayout} onEnter={isLoggedIn}>
        <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/canvas" component={Canvas} />
      </Route>
    </Router>
  );
}

export default Routes;
