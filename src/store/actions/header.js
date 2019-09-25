import * as Types from '../types';

export const setSortBy = sortBy => ({
  type: Types.SET_SORT_BY,
  payload: sortBy,
});

export const setFilterBy = filterBy => ({
  type: Types.SET_FILTER_BY,
  payload: filterBy,
});

export const setPageToLoad = page => ({
  type: Types.SET_PAGE_TO_LOAD,
  payload: page,
});
