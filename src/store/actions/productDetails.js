import * as Types from '../types';
import axios from 'axios';
import { config } from '../../services/config';

import { getProductPromise } from '../../fakebackend/promiseData';

export const loadProductInit = () => ({
  type: Types.LOAD_PRODUCT_INIT,
});

export const loadProductError = error => ({
  type: Types.LOAD_PRODUCT_ERROR,
  payload: error,
});

export const loadProductSuccess = product => ({
  type: Types.LOAD_PRODUCT_SUCCESS,
  payload: product,
});

export const loadProduct = (id, callback) => async (dispatch, getState) => {
  dispatch(loadProductInit());

  const response = await axios.get(`/product/${id}`);
  const product = response.data;

  //const product = await getProductPromise(id);
  // console.log(product);
  dispatch(loadProductSuccess(product));

  if (callback) callback();
};
