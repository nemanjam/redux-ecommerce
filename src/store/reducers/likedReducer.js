import * as Types from '../types';
import { config } from '../../services/config';

const initialState = {
  likedProducts: [],
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

    default:
      return state;
  }
};

export default likedReducer;
