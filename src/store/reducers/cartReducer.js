import * as Types from '../types';
import { config } from '../../services/config';

const initialState = {
  cartProducts: [],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.ADD_PRODUCT_TO_CART:
    case Types.REMOVE_PRODUCT_FROM_CART:
    case Types.REMOVE_PRODUCTS_FROM_CART:
      return {
        ...state,
        cartProducts: payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
