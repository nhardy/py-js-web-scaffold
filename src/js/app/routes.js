import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'app/views/App';


export default function getRoutes(store) { // eslint-disable-line no-unused-vars
  return (
    <Route path="/" component={App}>
      <IndexRoute component={null} />
      <Route path="*" component={null} status={404} />
    </Route>
  );
}
