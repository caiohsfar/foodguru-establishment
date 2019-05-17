import { Alert, Platform } from 'react-native';
import reactotron from 'reactotron-react-native';
import getErrorMessage from '../../utils/getErrorMessage';

import {
  IS_LOADING_FETCH_PRODUCTS,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  REMOVE_PRODUCT_FAILURE,
  REMOVE_PRODUCT_SUCCESS,
  TOGGLE_PRODUCT,
  EDIT_PRODUCT_FAILURE,
  EDIT_PRODUCT_SUCCESS
} from './types';

import api from '../../services/api';
import { getUserId } from '../../services/userServices';

export const edit = ({ product, idSection }) => async (dispatch) => {
  dispatch(isLoading());
  try {
    await api.put(`/products/${product.id}`, {...product, sectionId: idSection});
    dispatch(onEditSuccess({...product, sectionId: idSection }));
  } catch (error) {
    dispatch(onEditFailure(error));
  }
};

const onEditFailure = (error) => {
  const message = getErrorMessage(error);
  alert(message);
  return {
    type: EDIT_PRODUCT_FAILURE,
    payload: message
  };
};

const onEditSuccess = product => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: product
});

export const remove = id => async (dispatch) => {
  try {
    await api.put(`/products/delete/${id}`);
    dispatch(onRemoveSuccess(id));
  } catch (error) {
    dispatch(onRemoveFailure(error));
  }
};

const onRemoveFailure = (error) => {
  const message = getErrorMessage(error);
  return {
    type: REMOVE_PRODUCT_FAILURE,
    payload: message
  };
};

const onRemoveSuccess = id => ({
  type: REMOVE_PRODUCT_SUCCESS,
  payload: id
});

export const toggle = (id, status) => ({
  type: TOGGLE_PRODUCT,
  payload: { id, status }
});

export const isLoading = () => ({
  type: IS_LOADING_FETCH_PRODUCTS
});

export const create = ({ product, idSection }) => async (dispatch) => {
  console.log(product);
  dispatch(isLoading());
  api
    .post('/products', { product, id: idSection })
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


export const fetch = (sectionId) => async (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/products/${sectionId}`)
    .then((response) => {
      dispatch(fetchSuccess(response.data));
      reactotron.log('@OLHA A MERDA', response.data);
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
