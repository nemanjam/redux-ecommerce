import * as Types from '../types';
import axios from 'axios';
import qs from 'qs';

import {
  getProductsPromise,
  getAdvertisementsPromise,
} from '../../fakebackend/promiseData';
import { insertAdvert } from '../../utils';

let adverts = [];
let productsCache = [];

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

export const loadProducts = (params, isLoadMoreRequest, callback) => async (
  dispatch,
  getState,
) => {
  dispatch(loadProductsInit(isLoadMoreRequest));

  if (!isLoadMoreRequest) {
    const response = await axios.get('/adverts');
    adverts = response.data;
    //adverts = await getAdvertisementsPromise();
  }

  const strParams = qs.stringify(params);
  const response = await axios.get(`/products?${strParams}`);
  const products = response.data;

  // const products = await getProductsPromise(params);

  // console.log(moreProducts.map(p => p[params.sort.key]));
  const productsWithAdverts = insertAdvert(products, adverts, 5);
  dispatch(loadProductsSuccess(isLoadMoreRequest, productsWithAdverts));
  if (callback) callback();
};

//snackbars, errors handling, css cards hoover
