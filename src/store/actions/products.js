import * as Types from '../types';
import API from '../../services/api';

import { getProductsPromise } from '../../fakebackend/data';
import { getAdvertisementsPromise } from '../../fakebackend/data';
import { insertAdvert } from '../../utils';

export const loadProductsInit = isLoadMoreRequest => ({
  type: isLoadMoreRequest
    ? Types.LOAD_MORE_PRODUCTS_INIT
    : Types.LOAD_PRODUCTS_INIT,
});

export const loadProductsError = (isLoadMoreRequest, error) => ({
  type: isLoadMoreRequest
    ? Types.LOAD_MORE_PRODUCTS_ERROR
    : Types.LOAD_PRODUCTS_ERROR,
  payload: error,
});

export const loadProductsSuccess = (isLoadMoreRequest, products) => ({
  type: isLoadMoreRequest
    ? Types.LOAD_MORE_PRODUCTS_SUCCESS
    : Types.LOAD_PRODUCTS_SUCCESS,
  payload: products,
});

export const loadProducts = isLoadMoreRequest => async (dispatch, getState) => {
  dispatch(loadProductsInit(isLoadMoreRequest));
  // there is no difference in this part if its load more
  const products = await getProductsPromise();
  const adverts = await getAdvertisementsPromise();
  const productsWithAdverts = insertAdvert(products, adverts, 5);
  const moreProducts = [
    ...getState().productsReducer.products,
    ...productsWithAdverts,
  ];
  dispatch(loadProductsSuccess(isLoadMoreRequest, moreProducts));
};
