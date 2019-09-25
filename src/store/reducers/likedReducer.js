import * as Types from '../types';
import { config } from '../../services/config';

const initialState = {
  isLoading: false,
  error: null,
  likedProducts: [],
  hasMoreItems: true,
};

const likedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.LIKE_PRODUCT:
      return {
        ...state,
        likedProducts: [payload, ...state.likedProducts],
      };
    case Types.UNLIKE_PRODUCT:
      return {
        ...state,
        likedProducts: state.likedProducts.filter(p => p.id !== payload.id),
      };
    case Types.LOAD_LIKED_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: state.likedProducts.length > config.pageSize,
      };

    default:
      return state;
  }
};

export default likedReducer;
