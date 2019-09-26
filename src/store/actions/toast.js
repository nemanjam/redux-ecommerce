import * as Types from '../types';
import { config } from '../../services/config';

export const showToast = data => ({
  type: Types.SHOW_TOAST,
  payload: data,
});

export const hideToast = () => ({
  type: Types.HIDE_TOAST,
});
