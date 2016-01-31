import React from 'react';
import ReactDOM from 'react-dom';
import createStore from 'app/redux/createStore';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';
import getRoutes from 'app/routes';

const mountPoint = document.getElementById('root');
const store = createStore(getRoutes, browserHistory, window.__data);

const component = (
  <Router render={props =>
      <ReduxAsyncConnect {...props} />
    } history={browserHistory}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  mountPoint
);
