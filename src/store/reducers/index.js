import productsReducer from './products';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
