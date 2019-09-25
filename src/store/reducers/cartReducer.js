import * as Types from '../types';
import { config } from '../../services/config';

const initialState = {
  cartProducts: [],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cartProducts: [payload, ...state.cartProducts],
      };
    case Types.REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(p => p.id !== payload.id),
      };
    default:
      return state;
  }
};

export default cartReducer;
