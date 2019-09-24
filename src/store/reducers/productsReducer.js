import * as Types from '../types';

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  insertAddAt: 5,
};

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.LOAD_PRODUCTS_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case Types.LOAD_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case Types.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        products: payload,
      };
    case Types.LOAD_MORE_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case Types.LOAD_MORE_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        products: payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
