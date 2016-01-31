import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'app/views/App';
import Header from 'app/components/Header';


export default function getRoutes(store) { // eslint-disable-line no-unused-vars

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Header} />
      <Route path="*" component={null} status={404} />
    </Route>
  );
}
