import { applyMiddleware, createStore as _createStore } from 'redux';
import { syncHistory } from 'react-router-redux';

import fetchMiddleware from 'app/middlewares/fetch';
import reducer from 'app/reducers';

export default function createStore(getRoutes, history, data) {
  const reduxRouterMiddleware = syncHistory(history);

  const middleware = [fetchMiddleware(), reduxRouterMiddleware];

  const finalCreateStore = applyMiddleware(...middleware)(_createStore);

  return finalCreateStore(reducer, data);
}
