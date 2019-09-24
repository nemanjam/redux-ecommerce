import * as Types from '../types';

const initialState = {
  sortBy: 'none',
  filterBy: 'none',
  numberOfLikes: 0,
};

const headerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.SET_SORT_BY:
      return {
        ...state,
        sortBy: payload,
      };
    case Types.SET_FILTER_BY:
      return {
        ...state,
        filterBy: payload,
      };
    default:
      return state;
  }
};

export default headerReducer;
