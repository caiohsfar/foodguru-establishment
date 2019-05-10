import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import { Alert } from 'react-native';
import getErrorMessage from '../../utils/getErrorMessage';

import {
  IS_LOADING,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from './types';
import api from '../../services/api';
import NavigationService from '../../navigation/NavigationService';
import { getUserId } from '../../services/userServices';

export const isLoading = () => ({
  type: IS_LOADING
});

export const create = product => async (dispatch) => {
  console.log(product);
  dispatch(isLoading());
  const idEstablishment = await getUserId();
  Reactotron.log('product', product);
  api
    .post('/products', { product, id: idEstablishment })
    .then((response) => {
      dispatch(createSuccess(response.data));
      // NavigationService.navigate('SignIn');
    })
    .catch(error => dispatch(createFailure(error)));
  // OUTRAS TRATATIVAS
};
// NAVEGAR ATÉ OUTRA TELA
export const createSuccess = (product) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: product
});

export const createFailure = (error) => {
  const errorMessage = getErrorMessage(error);
  Alert.alert(errorMessage);
  return {
    type: CREATE_PRODUCT_FAILURE,
    payload: errorMessage
  };
};

export const fetch = () => async (dispatch) => {
  dispatch(isLoading());
  const idEstb = await getUserId();
  api
    .get(`/products/${idEstb}`)
    .then((response) => {
      Reactotron.log('LISTA PRODU', response);
      dispatch(fetchSuccess(response.data));
      // NavigationService.navigate('SignIn');
    })
    .catch(error => dispatch(fetchFailure(error)));
  // OUTRAS TRATATIVAS
};
// NAVEGAR ATÉ OUTRA TELA
export const fetchSuccess = list => ({
  type: FETCH_SUCCESS,
  payload: list
});

export const fetchFailure = (error) => {
  const errorMessage = getErrorMessage(error);
  Alert.alert(errorMessage);
  return {
    type: FETCH_FAILURE,
    payload: errorMessage
  };
};
