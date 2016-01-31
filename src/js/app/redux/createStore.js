import { applyMiddleware, createStore as _createStore } from 'redux';
import { syncHistory } from 'react-router-redux';

import reducer from 'app/reducers';

export default function createStore(getRoutes, history, data) {
  const reduxRouterMiddleware = syncHistory(history);

  const middleware = [reduxRouterMiddleware];

  const finalCreateStore = applyMiddleware(...middleware)(_createStore);

  return finalCreateStore(reducer, data);
}
