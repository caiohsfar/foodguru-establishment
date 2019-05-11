import {
  CEP_SUCCESS,
  CEP_FAILURE,
  IS_LOADING_AUTH,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  CLEAR_ADDRESS,
  CEP_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  loadState: false,
  signUpErrorMessage: '',
  signInErrorMessage: '',
  cepError: false,
  cepLoading: false,
  address: {
    street: '',
    state: '',
    neighborhood: '',
    city: ''
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING_AUTH:
      return {
        ...state,
        loadState: true,
        signUpErrorMessage: '',
        signInErrorMessage: ''
      };
    case SIGNUP_SUCCESS:
      return { ...state, loadState: false, signUpErrorMessage: '' };
    case SIGNUP_FAILURE:
      return { ...state, loadState: false, signUpErrorMessage: action.payload };
    case SIGNIN_SUCCESS:
      return { ...state, loadState: false, signInErrorMessage: '' };
    case SIGNIN_FAILURE:
      return { ...state, loadState: false, signInErrorMessage: action.payload };
    // ATTEMPT
    case CEP_LOADING:
      return { ...state, cepLoading: true };
    case CEP_SUCCESS:
      return { ...state, address: action.payload, cepLoading: false };
    case CEP_FAILURE:
      return { ...state, cepError: true, cepLoading: false };
    case CLEAR_ADDRESS:
      return { ...state, address: INITIAL_STATE.address, cepError: false };
    default:
      return state;
  }
};
