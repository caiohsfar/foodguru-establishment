import { isConditional } from '@babel/types';
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_SUCCESS,
  IS_LOADING,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  DELETE_PRODUCT_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  loadState: false,
  productList: [],
  onCreateError: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        loadState: true,
        createError: '',
        signInErrorMessage: ''
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: [...state.productList, action.payload],
        loadState: false,
        onCreateError: false
      };
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loadState: false,
        onCreateError: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        productList: action.payload
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: state.productList.filter(product => product.id != action.payload.id),
        loadState: false,
        onCreateError: false
      };
    default:
      return state;
  }
};
