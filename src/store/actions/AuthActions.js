import cepApi from 'cep-promise';
import { AsyncStorage } from 'react-native';
import {
  CEP_SUCCESS,
  CEP_FAILURE,
  CEP_LOADING,
  IS_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  CLEAR_ADDRESS,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE
} from './types';
import api from '../../services/api';
import NavigationService from '../../services/NavigationService';

export const isLoading = () => ({
  type: IS_LOADING
});

export const signUp = user => (dispatch) => {
  console.log(user);
  dispatch(isLoading());

  api
    .post('/establishments', user)
    .then(() => {
      dispatch(signUpSuccess());
      NavigationService.navigate('SignIn');
    })
    .catch(error => dispatch(signUpFailure(error.response.data.message)));
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

const createSession = async ({ token, establishment, hi }) => {
  try {
    await AsyncStorage.setItem('@FoodGuru:session', JSON.stringify({ token, establishment, hi }));
  } catch (error) {
    console.log(error);
  }
};

export const signIn = ({ email, password }) => (dispatch) => {
  dispatch(isLoading());
  api
    .post('/establishments/login', { email, password })
    .then((response) => {
      // Cria a sessão do usuario
      console.log(response);
      createSession(response.data);
      dispatch(signInSuccess());
      // Chama o navigation static
      NavigationService.navigate('App');
    })
    .catch((error) => {
      console.log(error.response);
      dispatch(signInFailure(error.response.data.message));
    });
};

export const signInSuccess = () => ({
  type: SIGNIN_SUCCESS
});

export const signInFailure = error => ({
  type: SIGNIN_FAILURE,
  payload: error
});
