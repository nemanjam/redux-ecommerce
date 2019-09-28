import productsReducer from './productsReducer';
import headerReducer from './headerReducer';
import likedReducer from './likedReducer';
import cartReducer from './cartReducer';
import productDetailsReducer from './productDetailsReducer';
import toastReducer from './toastReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  productsReducer,
  headerReducer,
  likedReducer,
  cartReducer,
  productDetailsReducer,
  toastReducer,
  authReducer,
});

export default rootReducer;
