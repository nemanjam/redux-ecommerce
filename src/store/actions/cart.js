import * as Types from '../types';
import { config } from '../../services/config';

export const addProductToCart = product => ({
  type: Types.ADD_PRODUCT_TO_CART,
  payload: product,
});

export const removeProductFromCart = product => ({
  type: Types.REMOVE_PRODUCT_FROM_CART,
  payload: product,
});
