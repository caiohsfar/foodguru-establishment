import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProductsReducer from './ProductsReducer';

const Reducers = combineReducers({
  AuthReducer,
  ProductsReducer
});

export default Reducers;
