import productsReducer from './productsReducer';
import headerReducer from './headerReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  productsReducer,
  headerReducer,
});

export default rootReducer;
