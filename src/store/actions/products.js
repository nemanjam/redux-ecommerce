import * as Types from '../types';
import API from '../../services/api';

export const fetchProducts = (params, isFetchMoreRequest) => dispatch => {
  dispatch(fetchProductsPending(isFetchMoreRequest));

  //reset cached store if the request is not a load more request
  let key = getQueryParams(params);
  !isFetchMoreRequest && (CACHED_STORE = {});

  //check if the query has been loaded preemptively and load from cached store if true
  //else attempt to send a query to the API
  if (key in CACHED_STORE) {
    dispatch(fetchProductsFulfilled(CACHED_STORE[key], isFetchMoreRequest));
    loadMoreDataPreemptively(params);
  } else {
    return API({ params })
      .then(data => {
        loadMoreDataPreemptively(params);
        dispatch(fetchProductsFulfilled(data, isFetchMoreRequest));
      })
      .catch(error => dispatch(fetchProductsError(error)));
  }
};
