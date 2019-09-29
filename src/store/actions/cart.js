import * as Types from '../types';
import { config } from '../../services/config';
import { showToast } from './toast';

export const addProductToCart = product => (dispatch, getState) => {
  const existing = getState().cartReducer.cartProducts.filter(
    p => p.product.id === product.id,
  ).length;
  let products = [...getState().cartReducer.cartProducts];
  if (existing === 0) {
    products = [{ product, quantity: 1 }, ...products];
  }
  if (existing === 1) {
    let _product = products.find(p => p.product.id === product.id);
    const index = products.indexOf(_product);
    const filtered = getState().cartReducer.cartProducts.filter(
      p => p.product.id !== product.id,
    );
    _product.quantity++;
    filtered.splice(index, 0, _product); // at index
  }

  dispatch(
    showToast({
      title: 'Notification',
      text: `You added the ${product.name} to the cart.`,
    }),
  );

  dispatch({
    type: Types.ADD_PRODUCT_TO_CART,
    payload: products,
  });
};

export const removeProductFromCart = product => (dispatch, getState) => {
  const existing = getState().cartReducer.cartProducts.find(
    p => p.product.id === product.id,
  );
  let products = [...getState().cartReducer.cartProducts];
  if (existing.quantity === 1) {
    products = products.filter(p => p.product.id !== product.id);
  }

  if (existing.quantity > 1) {
    let _product = products.find(p => p.product.id === product.id);
    _product.quantity--;
  }

  dispatch(
    showToast({
      title: 'Notification',
      text: `You removed the ${product.name} from the cart.`,
    }),
  );

  dispatch({
    type: Types.REMOVE_PRODUCT_FROM_CART,
    payload: products,
  });
};

export const removeProductsFromCart = product => (dispatch, getState) => {
  let products = [...getState().cartReducer.cartProducts];
  products = products.filter(p => p.product.id !== product.id);

  dispatch(
    showToast({
      title: 'Notification',
      text: `You removed all of the ${product.name}'s from the cart.`,
    }),
  );

  dispatch({
    type: Types.REMOVE_PRODUCTS_FROM_CART,
    payload: products,
  });
};
