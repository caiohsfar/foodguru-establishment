import reactotron from 'reactotron-react-native';
import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  IS_LOADING_FETCHING_ORDERS,
  ADD_TO_PROGRESS,
  FINALIZE_FAILURE,
  FINALIZE_SUCCESS,
  ADD_TO_MADE
} from '../types/OrderTypes';

const INITIAL_STATE = {
  errorMessage: '',
  fetchLoadState: false,
  madeList: [],
  inProgressList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING_FETCHING_ORDERS:
      return {
        ...state,
        fetchLoadState: true,
        errorMessage: ''
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        madeList: action.payload,
        fetchLoadState: false,
        errorMessage: ''
      };
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        fetchLoadState: false,
        errorMessage: action.payload
      };
    case ADD_TO_PROGRESS: {
      return {
        ...state,
        madeList: state.madeList.filter(item => item.id !== action.payload.id),
        inProgressList: [...state.inProgressList, action.payload]
      };
    }
    case FINALIZE_SUCCESS: {
      return {
        ...state,
        inProgressList: state.inProgressList.filter(item => item.id !== action.payload)
      };
    }
    case FINALIZE_FAILURE: {
      return state;
    }
    case ADD_TO_MADE: {
      return {
        ...state,
        madeList: [action.payload, ...state.madeList]
      };
    }
    default:
      return state;
  }
};
