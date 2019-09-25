import productsReducer from './productsReducer';
import headerReducer from './headerReducer';
import likedReducer from './likedReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  productsReducer,
  headerReducer,
  likedReducer,
  cartReducer,
});

export default rootReducer;
