import * as Types from '../types';

export const setSortBy = sortBy => ({
  type: Types.SET_SORT_BY,
  payload: sortBy,
});

export const setFilterBy = filterBy => ({
  type: Types.SET_FILTER_BY,
  payload: filterBy,
});
