import cepApi from 'cep-promise';
import {
  CEP_SUCCESS,
  CEP_FAILURE,
  CEP_LOADING,
  IS_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  CLEAR_ADDRESS
} from './types';
import api from '../../services/api';

export const isLoading = () => ({
  type: IS_LOADING
});

export const signUp = user => (dispatch) => {
  console.log(user);
  dispatch(isLoading());

  api
    .post('/api/establishments', user)
    .then(() => dispatch(signUpSuccess()))
    .catch(error => dispatch(signUpFailure(error)));
  // OUTRAS TRATATIVAS
};
// NAVEGAR ATÉ OUTRA TELA
export const signUpSuccess = () => ({
  type: SIGNUP_SUCCESS
});

export const signUpFailure = error => ({
  type: SIGNUP_FAILURE,
  payload: error
});
export const cepLoading = () => ({
  type: CEP_LOADING
});
export const findCep = cep => (dispatch) => {
  dispatch(cepLoading());
  cepApi(cep)
    .then(address => dispatch(findCepSuccess(address)))
    .catch(() => dispatch(findCepFailure()));
};

export const findCepSuccess = address => ({
  type: CEP_SUCCESS,
  payload: address
});

export const findCepFailure = () => ({
  type: CEP_FAILURE,
  payload: true
});

export const clearAddress = () => ({
  type: CLEAR_ADDRESS
});
