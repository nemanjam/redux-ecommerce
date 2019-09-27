import * as Types from '../types';

const initialState = {
  sortBy: { key: 'none', direction: 'asc' },
  filterBy: { brand: 'none', color: 'none' },
  pageToLoad: 0,
};

const headerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.SET_SORT_BY:
      return {
        ...state,
        sortBy: { ...payload },
      };
    case Types.SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...payload },
      };
    case Types.SET_PAGE_TO_LOAD:
      return {
        ...state,
        pageToLoad: payload,
      };
    default:
      return state;
  }
};

export default headerReducer;
