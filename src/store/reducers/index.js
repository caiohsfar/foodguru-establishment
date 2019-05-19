import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProductsReducer from './ProductsReducer';
import CategoryReducer from './CategoryReducer';

const Reducers = combineReducers({
  AuthReducer,
  ProductsReducer,
  CategoryReducer
});

export default Reducers;
