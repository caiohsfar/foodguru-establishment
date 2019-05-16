import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_SUCCESS,
  IS_LOADING_FETCH_PRODUCTS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  DELETE_PRODUCT_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  fetchError: false,
  fetchLoadState: false,
  productList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING_FETCH_PRODUCTS:
      return {
        ...state,
        fetchLoadState: true
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: [...state.productList, action.payload],
        fetchLoadState: false
      };
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        fetchLoadState: false
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        fetchLoadState: false,
        fetchError: false
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        fetchError: true,
        fetchLoadState: false
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: state.productList.filter(product => product.id !== action.payload.id),
        loadState: false,
        fetchLoadState: false
      };
    default:
      return state;
  }
};