import * as Types from '../types';
import { config } from '../../services/config';

export const likeProduct = product => ({
  type: Types.LIKE_PRODUCT,
  payload: product,
});

export const unlikeProduct = product => ({
  type: Types.UNLIKE_PRODUCT,
  payload: product,
});
