import * as Types from '../types';
import API from '../../services/api';

import { getProductsPromise } from '../../fakebackend/data';
import { getAdvertisementsPromise } from '../../fakebackend/data';

export const loadProductsInit = () => ({
  type: Types.LOAD_PRODUCTS_INIT,
});

export const loadProductsError = error => ({
  type: Types.LOAD_PRODUCTS_ERROR,
  payload: error,
});

export const loadProductsSuccess = products => ({
  type: Types.LOAD_PRODUCTS_SUCCESS,
  payload: products,
});

export const loadProducts = () => async dispatch => {
  dispatch(loadProductsInit());
  const products = await getProductsPromise();
  dispatch(loadProductsSuccess(products));
};

// load more
export const loadMoreProductsError = error => ({
  type: Types.LOAD_MORE_PRODUCTS_ERROR,
  payload: error,
});

export const loadMoreProductsSuccess = products => ({
  type: Types.LOAD_MORE_PRODUCTS_SUCCESS,
  payload: products,
});

export const loadMoreProducts = () => async (dispatch, getState) => {
  dispatch(loadProductsInit());
  const products = await getProductsPromise();
  const moreProducts = [...getState().productsReducer.products, ...products];
  console.log(moreProducts);
  dispatch(loadMoreProductsSuccess(moreProducts));
};
