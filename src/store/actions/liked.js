import * as Types from '../types';
import { config } from '../../services/config';

import { getProductsPromise } from '../../fakebackend/data';

export const likeProduct = product => ({
  type: Types.LIKE_PRODUCT,
  payload: product,
});

export const unlikeProduct = product => ({
  type: Types.UNLIKE_PRODUCT,
  payload: product,
});

export const loadLikedProducts = () => ({
  type: Types.LOAD_LIKED_PRODUCTS,
  payload: null,
});
