import * as Types from '../types';
import { showToast } from './toast';
import _ from 'lodash';

export const setGoogleUser = googleUser => dispatch => {
  dispatch(logoutLocalUser());
  localStorage.setItem('googleUser', JSON.stringify(googleUser));
  dispatch(
    showToast({
      title: 'Notification',
      text: `Google user ${googleUser.name} successfully logged in.`,
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
  if (googleUser) {
    dispatch(
      showToast({
        title: 'Notification',
        text: `Google user ${googleUser.name} successfully logged out.`,
      }),
    );
    localStorage.removeItem('googleUser');
    dispatch({
      type: Types.LOGOUT_GOOGLE_USER,
    });
  }
};

export const registerLocalUser = localUser => dispatch => {
  dispatch(logOutGoogleUser());
  // delete localUser.password;
  delete localUser.repeatPassword;
  localStorage.setItem('localUser', JSON.stringify(localUser));

  dispatch(
    showToast({
      title: 'Notification',
      text: `Local user ${localUser.name} successfully registered.`,
    }),
  );
  dispatch({
    type: Types.REGISTER_LOCAL_USER,
    payload: localUser,
  });
};

export const loginLocalUser = _localUser => (dispatch, getState) => {
  dispatch(logOutGoogleUser());

  let localUser = { ...getState().authReducer.localUser };
  localUser = _.isEmpty(localUser) ? null : localUser;
  if (
    !localUser &&
    _localUser.email === 'default@gmail.com' &&
    _localUser.password === 'password'
  ) {
    const defaultUser = {
      name: 'DefaultName',
      email: 'default@gmail.com',
      password: 'password',
    };
    localUser = defaultUser;
  }
  if (localUser) {
    localStorage.setItem('localUser', JSON.stringify(localUser));
    dispatch(
      showToast({
        title: 'Notification',
        text: `Local user ${localUser.email} successfully logged in.`,
      }),
    );
  } else {
    dispatch(
      showToast({
        title: 'Error',
        text: `Wrong email or password.`,
      }),
    );
  }
  dispatch({
    type: Types.LOGIN_LOCAL_USER,
    payload: localUser,
  });
};

export const logoutLocalUser = () => (dispatch, getState) => {
  const localUser = JSON.parse(localStorage.getItem('localUser'));
  if (localUser) {
    localStorage.removeItem('localUser');

    dispatch(
      showToast({
        title: 'Notification',
        text: `Local user ${localUser.name} successfuly logged out.`,
      }),
    );
    dispatch({
      type: Types.LOGOUT_LOCAL_USER,
    });
  }
};

export const getLocalUser = () => {
  const localUser = JSON.parse(localStorage.getItem('localUser'));

  return {
    type: Types.GET_LOCAL_USER,
    payload: localUser,
  };
};

export const redirectAfterLogin = callback => {
  if (callback) callback();

  return {
    type: Types.REDIRECT_AFTER_LOGIN,
  };
};
