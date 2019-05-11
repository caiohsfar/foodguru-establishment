import cepApi from 'cep-promise';
import AsyncStorage from '@react-native-community/async-storage';
import getErrorMessage from '../../utils/getErrorMessage';

import {
  CEP_SUCCESS,
  CEP_FAILURE,
  CEP_LOADING,
  IS_LOADING_AUTH,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  CLEAR_ADDRESS,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE
} from './types';
import api from '../../services/api';
import NavigationService from '../../navigation/NavigationService';
import Reactotron from 'reactotron-react-native';

export const isLoading = () => ({
  type: IS_LOADING_AUTH
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
    .catch(error => dispatch(signUpFailure(error)));
  // OUTRAS TRATATIVAS
};
// NAVEGAR ATÉ OUTRA TELA
export const signUpSuccess = () => ({
  type: SIGNUP_SUCCESS
});

export const signUpFailure = (error) => {
  const errorMessage = getErrorMessage(error);
  return {
    type: SIGNUP_FAILURE,
    payload: errorMessage
  };
};

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
  Reactotron.log("TOKEN:", { token, establishment, hi });
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
      dispatch(signInFailure(error));
    });
};

export const signInSuccess = () => ({
  type: SIGNIN_SUCCESS
});

export const signInFailure = (error) => {
  const errorMessage = getErrorMessage(error);
  return {
    type: SIGNIN_FAILURE,
    payload: errorMessage
  };
};
