import * as Types from '../types';
import axios from 'axios';

import { getProductPromise } from '../../fakebackend/promiseData';
import { showToast } from './toast';

export const loadProductInit = () => ({
  type: Types.LOAD_PRODUCT_INIT,
});

export const loadProductError = error => dispatch => {
  dispatch({ type: Types.LOAD_PRODUCT_ERROR, payload: error });
  dispatch(showToast({ title: 'Error', text: error }));
};

export const loadProductSuccess = product => ({
  type: Types.LOAD_PRODUCT_SUCCESS,
  payload: product,
});

export const loadProduct = (id, callback) => async (dispatch, getState) => {
  dispatch(loadProductInit());

  try {
    const response = await axios.get(`/product/${id}`);
    const product = response.data;

    //const product = await getProductPromise(id);
    // console.log(product);
    dispatch(loadProductSuccess(product));

    if (callback) callback();
  } catch (error) {
    if (error.message) {
      dispatch(loadProductError(error.message));
    }
  }
};
