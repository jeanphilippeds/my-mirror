import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Root } from './components';
import { Home } from './pages';

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
  </Route>
);

export default routes;
