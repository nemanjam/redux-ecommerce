import * as Types from '../types';

const initialState = {
  googleUser: null,
  localUser: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.GOOGLE_AUTH_SUCCESS:
      return {
        ...state,
        googleUser: { ...payload },
      };
    case Types.GET_GOOGLE_USER:
      return {
        ...state,
        googleUser: payload,
      };
    case Types.LOGOUT_GOOGLE_USER:
      return {
        ...state,
        googleUser: null,
      };
    case Types.REGISTER_LOCAL_USER:
      return {
        ...state,
        localUser: { ...payload },
      };
    case Types.LOGIN_LOCAL_USER:
      return {
        ...state,
        localUser: payload,
      };
    case Types.LOGOUT_LOCAL_USER:
      return {
        ...state,
        localUser: null,
      };
    case Types.GET_LOCAL_USER:
      return {
        ...state,
        localUser: payload,
      };
    case Types.REDIRECT_AFTER_LOGIN:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default authReducer;
