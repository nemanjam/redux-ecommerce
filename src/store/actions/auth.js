import * as Types from '../types';
import { showToast } from './toast';

export const setGoogleUser = googleUser => dispatch => {
  localStorage.setItem('googleUser', JSON.stringify(googleUser));
  dispatch(
    showToast({
      title: 'Notification',
      text: `Google user ${googleUser.name} successfuly logged in.`,
    }),
  );
  dispatch({
    type: Types.GOOGLE_AUTH_SUCCESS,
    payload: googleUser,
  });
};

export const getGoogleUser = () => {
  const googleUser = JSON.parse(localStorage.getItem('googleUser'));

  return {
    type: Types.GET_GOOGLE_USER,
    payload: googleUser,
  };
};

export const logOutGoogleUser = () => dispatch => {
  const googleUser = JSON.parse(localStorage.getItem('googleUser'));
  dispatch(
    showToast({
      title: 'Notification',
      text: `Google user ${googleUser.name} successfuly logged out.`,
    }),
  );
  localStorage.removeItem('googleUser');
  dispatch({
    type: Types.LOGOUT_GOOGLE_USER,
  });
};
