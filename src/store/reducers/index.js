import productsReducer from './productsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  productsReducer,
});

export default rootReducer;
