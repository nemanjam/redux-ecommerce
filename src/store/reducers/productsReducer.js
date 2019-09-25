import * as Types from '../types';
import { config } from '../../services/config';

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  hasMoreItems: true,
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
        hasMoreItems: false,
        error: payload,
      };
    case Types.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: payload.length > config.pageSize,
        error: null,
        products: payload,
      };
    case Types.LOAD_MORE_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: false,
        error: payload,
      };
    case Types.LOAD_MORE_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: payload.length > config.pageSize,
        error: null,
        products: [...state.products, ...payload],
      };
    default:
      return state;
  }
};

export default productsReducer;
