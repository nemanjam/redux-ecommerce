import * as Types from '../types';

const initialState = {
  googleUser: null,
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

    default:
      return state;
  }
};

export default authReducer;
