import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProductsReducer from './ProductsReducer';
import CategoryReducer from './CategoryReducer';
import BoardReducer from './BoardReducer';

const Reducers = combineReducers({
  AuthReducer,
  ProductsReducer,
  CategoryReducer,
  BoardReducer
});

export default Reducers;
