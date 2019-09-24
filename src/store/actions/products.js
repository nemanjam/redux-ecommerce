import * as Types from '../types';
import API from '../../services/api';
import { config } from '../../services/config';

import { getProductsPromise } from '../../fakebackend/data';
import { getAdvertisementsPromise } from '../../fakebackend/data';
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

export const loadProducts = (params, isLoadMoreRequest) => async (
  dispatch,
  getState,
) => {
  dispatch(loadProductsInit(isLoadMoreRequest));

  let moreProducts = [];
  if (!isLoadMoreRequest) {
    adverts = await getAdvertisementsPromise();
  }
  const products = await getProductsPromise(params);

  if (!isLoadMoreRequest && params && params.filter !== 'none') {
    moreProducts = [...products];
  } else {
    //load more
    moreProducts = [...getState().productsReducer.products, ...products];
  }

  const productsWithAdverts = insertAdvert(moreProducts, adverts, 5);
  dispatch(loadProductsSuccess(isLoadMoreRequest, productsWithAdverts));
};

export const sortProductsSuccess = products => ({
  type: Types.SORT_PRODUCTS_SUCCESS,
  payload: products,
});

//wrong, server should sort, database, not the state
export const sortProducts = ({ key, direction }) => (dispatch, getState) => {
  if (key && key !== 'none') {
    function compare(a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    }
    let sortedProducts = getState()
      .productsReducer.products.slice()
      .filter(product => !product.isAdvert);

    if (direction === 'asc') sortedProducts = sortedProducts.sort(compare);
    else sortedProducts = sortedProducts.reverse(compare);

    console.log(sortedProducts.map(p => p[key]));
    const productsWithAdverts = insertAdvert(sortedProducts, adverts, 5);
    dispatch(sortProductsSuccess(productsWithAdverts));
  } else if (key && key === 'none') {
    dispatch(
      loadProducts(
        {
          page: { index: 0, size: config.pageSize },
          sort: 'none',
          filter: 'none',
        },
        false,
      ),
    );
  }
};

/*
export const loadProducts = (params, isLoadMoreRequest) => async (
  dispatch,
  getState,
) => {
  dispatch(loadProductsInit(isLoadMoreRequest));
  let moreProducts = [];
  let productsWithAdverts = [];

  if (!isLoadMoreRequest) {
    //first time
    const products = await getProductsPromise();
    adverts = await getAdvertisementsPromise();
    moreProducts = [...getState().productsReducer.products, ...products];
    productsWithAdverts = insertAdvert(moreProducts, adverts, 5);
  } else {
    moreProducts = [...getState().productsReducer.products, ...productsCache];
    productsWithAdverts = insertAdvert(moreProducts, adverts, 5);
  }
  dispatch(loadProductsSuccess(isLoadMoreRequest, productsWithAdverts)); // dispatch action before fetching in cache
  productsCache = await getProductsPromise();
};
*/
