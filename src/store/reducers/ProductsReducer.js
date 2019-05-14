import reactotron from 'reactotron-react-native';
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_SUCCESS,
  IS_LOADING_FETCH_PRODUCTS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAILURE,
  TOGGLE_PRODUCT,
  SELECT_PRODUCT,
  UNSELECT_PRODUCT
} from '../actions/types';

const INITIAL_STATE = {
  fetchError: false,
  fetchLoadState: false,
  productList: [],
  selecteds: new Map(),
  selectedCount: 0
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
    case REMOVE_PRODUCT_SUCCESS:
      reactotron.log('remove product', action.payload);
      return {
        ...state,
        selecteds: new Map(),
        productList: state.productList.filter(product => product.id !== action.payload),
        selectedCount: state.selectedCount - 1
      };
    case TOGGLE_PRODUCT:
      return {
        ...state,
        selecteds: new Map(state.selecteds).set(action.payload.id, action.payload.status),
        selectedCount: action.payload.status ? state.selectedCount + 1 : state.selectedCount - 1
      };
    default:
      return state;
  }
};
