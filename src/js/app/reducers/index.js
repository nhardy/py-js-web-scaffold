import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import pages from './pages';


export default combineReducers({
  pages,
  reduxAsyncConnect,
  routing: routeReducer,
});
