import axios from 'axios';


export default function fetchDataMiddleware() {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { types, endpoint, ...rest } = action;
      if (!endpoint) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });

      return axios.get(`${__SERVER__ ? 'http://localhost:8080' : ''}${endpoint}`)
        .then(
          response => next({
            ...rest,
            response,
            type: SUCCESS,
          }),
          error => next({
            ...rest,
            error,
            type: FAILURE,
          })
        ).catch(
          error => {
            console.error('ERROR IN MIDDLEWARE:', // eslint-disable-line no-console
              error.stack || error);
            next({
              ...rest,
              error,
              type: FAILURE,
            });
          }
        );
    };
  };
}
