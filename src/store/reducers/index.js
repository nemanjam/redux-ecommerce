import productsReducer from './productsReducer';
import headerReducer from './headerReducer';
import likedReducer from './likedReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  productsReducer,
  headerReducer,
  likedReducer,
});

export default rootReducer;
