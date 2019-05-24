import {
  IS_LOADING_FETCH_CATEGORIES,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  REMOVE_CATEGORY_FAILURE,
  REMOVE_CATEGORY_SUCCESS,
  TOGGLE_CATEGORY,
  EDIT_CATEGORY_FAILURE,
  EDIT_CATEGORY_SUCCESS,
  IS_LOADING_CREATE_CATEGORY
} from '../types/CategoryTypes';

const INITIAL_STATE = {
  fetchError: false,
  fetchLoadState: false,
  addLoadState: false,
  categoryList: [],
  selecteds: new Map(),
  selectedCount: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING_FETCH_CATEGORIES:
      return {
        ...state,
        fetchLoadState: true
      };
    case IS_LOADING_CREATE_CATEGORY:
      return {
        ...state,
        addLoadState: true
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: [...state.categoryList, action.payload],
        addLoadState: false
      };
    case CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        addLoadState: false
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoryList: action.payload,
        fetchLoadState: false,
        fetchError: false
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        fetchError: true,
        fetchLoadState: false
      };
    case REMOVE_CATEGORY_SUCCESS:
      return {
        ...state,
        selecteds: new Map(),
        categoryList: state.categoryList.filter(category => category.id !== action.payload),
        selectedCount: state.selectedCount - 1
      };
    case TOGGLE_CATEGORY:
      return {
        ...state,
        selecteds: new Map(state.selecteds).set(action.payload.id, action.payload.status),
        selectedCount: action.payload.status ? state.selectedCount + 1 : state.selectedCount - 1
      };
    case EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchLoadState: false,
        categoryList: state.categoryList.map(category => (category.id === action.payload.id ? action.payload : category))
      };
    case EDIT_CATEGORY_FAILURE:
      return {
        ...state,
        fetchLoadState: false
      };
    default:
      return state;
  }
};
