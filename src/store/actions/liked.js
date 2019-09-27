import * as Types from '../types';
import { showToast } from './toast';

export const likeProduct = product => (dispatch, getState) => {
  dispatch(
    showToast({
      title: 'Notification',
      text: `You liked the ${product.name}.`,
    }),
  );

  dispatch({ type: Types.LIKE_PRODUCT, payload: product });
};

export const unlikeProduct = product => (dispatch, getState) => {
  dispatch(
    showToast({
      title: 'Notification',
      text: `You unliked the ${product.name}.`,
    }),
  );

  dispatch({
    type: Types.UNLIKE_PRODUCT,
    payload: product,
  });
};
