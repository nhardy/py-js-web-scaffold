export const FETCH_PAGE_REQUEST = 'FETCH_PAGE_REQUEST';
export const FETCH_PAGE_SUCCESS = 'FETCH_PAGE_SUCCESS';
export const FETCH_PAGE_FAILURE = 'FETCH_PAGE_FAILURE';

export function fetchPageData(path) {
  const trimmedPath = path.replace(/^\/*/, '');
  return {
    types: [FETCH_PAGE_REQUEST, FETCH_PAGE_SUCCESS, FETCH_PAGE_FAILURE],
    endpoint: `/api/v1/pages/${trimmedPath}`,
    page: `/${trimmedPath}`,
  };
}
