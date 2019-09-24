import * as Types from '../types';

const initialState = {
  loading: false,
  error: null,
  fetchingMore: false,
  data: [],
  hasEndBeenReached: false,
  advertTargetIndex: 20,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOAD_PRODUCTS_INIT:
      return {
        ...state,
        loading: true,
        error: null,
        fetchingMore: false,
        hasEndBeenReached: false,
        data: state.data || [],
      };
    default:
      return state;
  }
};

export default productsReducer;
