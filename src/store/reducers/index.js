import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProductsReducer from './ProductsReducer';
import CategoryReducer from './CategoryReducer';
import BoardReducer from './BoardReducer';
import OrdersReducer from './OrdersReducer';

const Reducers = combineReducers({
  AuthReducer,
  ProductsReducer,
  CategoryReducer,
  BoardReducer,
  OrdersReducer
});

export default Reducers;
