import * as Types from '../types';
import { config } from '../../services/config';

export const likeProduct = product => (dispatch, getState) => {
  dispatch({
    type: Types.SHOW_TOAST,
    payload: {
      title: 'Notification',
      text: `You liked the ${product.name}.`,
    },
  });

  dispatch({ type: Types.LIKE_PRODUCT, payload: product });
};

export const unlikeProduct = product => (dispatch, getState) => {
  dispatch({
    type: Types.SHOW_TOAST,
    payload: {
      title: 'Notification',
      text: `You unliked the ${product.name}.`,
    },
  });

  dispatch({
    type: Types.UNLIKE_PRODUCT,
    payload: product,
  });
};
