import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import { Alert, Platform } from 'react-native';
import getErrorMessage from '../../utils/getErrorMessage';

import {
  IS_LOADING_FETCH_PRODUCTS,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from './types';
import api from '../../services/api';
import { getUserId } from '../../services/userServices';

export const isLoading = () => ({
  type: IS_LOADING_FETCH_PRODUCTS
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

const upload = ({ image, idEstablishment }) => async (dispatch) => {
  const data = new FormData();
  data.append('image', {
    name: image.fileName,
    type: image.type,
    uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', '')
  });
  data.append('id', idEstablishment);
};

export const createSuccess = product => ({
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
    })
    .catch(error => dispatch(fetchFailure(error)));
  // OUTRAS TRATATIVAS
};
// NAVEGAR ATÉ OUTRA TELA
export const fetchSuccess = list => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: list
});

export const fetchFailure = (error) => {
  const errorMessage = getErrorMessage(error);
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: errorMessage
  };
};
