import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAILURE,
} from 'app/actions/fetchPageData';


const initialState = {};

export default function reducer(state = initialState, action = {}) {
  const { error, page, response, type } = action;

  switch (type) {
    case FETCH_PAGE_REQUEST:
      return {
        ...state,
        [page]: {
          ...state[page],
          loading: true,
        },
      };

    case FETCH_PAGE_SUCCESS:
      return {
        ...state,
        [page]: {
          ...state[page],
          data: response.data,
          loaded: true,
          loading: false,
        },
      };

    case FETCH_PAGE_FAILURE:
      return {
        ...state,
        [page]: {
          ...state[page],
          error,
          loaded: false,
          loading: false,
        },
      };

    default:
      return state;
  }
}
