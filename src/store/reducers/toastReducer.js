import * as Types from '../types';

const initialState = {
  show: false,
  title: '',
  text: '',
};

const toastReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.SHOW_TOAST:
      return {
        ...state,
        show: true,
        title: payload.title,
        text: payload.text,
      };
    case Types.HIDE_TOAST:
      return {
        ...state,
        show: false,
        title: '',
        text: '',
      };
    default:
      return state;
  }
};

export default toastReducer;
