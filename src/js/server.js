import minimist from 'minimist';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import output from './server/output';

import { createMemoryHistory, match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import { Provider } from 'react-redux';
import createStore from 'app/redux/createStore';
import getRoutes from 'app/routes';
import Html from 'app/views/Html';


const history = createMemoryHistory();
const store = createStore(getRoutes, history);

const argv = minimist(process.argv.slice(2));

match({
  history,
  routes: getRoutes(store),
  location: argv.path,
}, (error, redirectLocation, renderProps) => {
  if (redirectLocation) {
    return console.error('SHOULD NOT REDIRECT'); // eslint-disable-line no-console
  }
  if (error) {
    return console.error('ROUTER ERROR:', error); // eslint-disable-line no-console
  }
  loadOnServer(renderProps, store).then(() => {
    const component = (
      <Provider store={store} key="provider">
        <ReduxAsyncConnect {...renderProps} />
      </Provider>
    );

    const html = ReactDOMServer.renderToString(<Html component={component} store={store} />);

    output(`<!DOCTYPE html>\n${html}`);
  }).catch((err) => {
    console.error(err.stack || err);
    throw err;
  });
});
