import { Alert, Platform } from 'react-native';
import reactotron from 'reactotron-react-native';
import getErrorMessage from '../../utils/getErrorMessage';

import {
  IS_LOADING_FETCH_CATEGORIES,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  REMOVE_CATEGORY_FAILURE,
  REMOVE_CATEGORY_SUCCESS,
  TOGGLE_CATEGORY,
  IS_LOADING_CREATE_CATEGORY,
  EDIT_CATEGORY_FAILURE,
  EDIT_CATEGORY_SUCCESS
} from '../types/CategoryTypes';

import api from '../../services/api';
import { getUserId } from '../../services/userServices';

// export const edit = ({ product, idSection }) => async (dispatch) => {
//   dispatch(isLoadingFetch());
//   try {
//     await api.put(`/products/${product.id}`, { ...product, sectionId: idSection });
//     dispatch(onEditSuccess({ ...product, sectionId: idSection }));
//   } catch (error) {
//     dispatch(onEditFailure(error));
//   }
// };

// const onEditFailure = (error) => {
//   const message = getErrorMessage(error);
//   alert(message);
//   return {
//     type: EDIT_CATEGORY_FAILURE,
//     payload: message
//   };
// };

// const onEditSuccess = product => ({
//   type: EDIT_CATEGORY_SUCCESS,
//   payload: product
// });

export const isLoadingFetch = () => ({
  type: IS_LOADING_FETCH_CATEGORIES
});

export const isLoadingCreate = () => ({
  type: IS_LOADING_CREATE_CATEGORY
});

export const remove = id => async (dispatch) => {
  try {
    await api.put(`/sections/delete/${id}`);
    dispatch(onRemoveSuccess(id));
  } catch (error) {
    dispatch(onRemoveFailure(error));
  }
};

const onRemoveFailure = (error) => {
  const message = getErrorMessage(error);
  return {
    type: REMOVE_CATEGORY_FAILURE,
    payload: message
  };
};

const onRemoveSuccess = id => ({
  type: REMOVE_CATEGORY_SUCCESS,
  payload: id
});

export const toggle = (id, status) => ({
  type: TOGGLE_CATEGORY,
  payload: { id, status }
});

export const create = ({ section }) => async (dispatch) => {
  console.log(section);
  dispatch(isLoadingCreate());
  const userId = await getUserId();
  api
    .post('/sections', { section, id: userId })
    .then((response) => {
      dispatch(createSuccess(response.data));
      // NavigationService.navigate('SignIn');
    })
    .catch(error => dispatch(createFailure(error)));
  // OUTRAS TRATATIVAS
};

export const createSuccess = product => ({
  type: CREATE_CATEGORY_SUCCESS,
  payload: product
});

export const createFailure = (error) => {
  const errorMessage = getErrorMessage(error);
  Alert.alert(errorMessage);
  return {
    type: CREATE_CATEGORY_FAILURE,
    payload: errorMessage
  };
};

export const fetch = () => async (dispatch) => {
  dispatch(isLoadingFetch());
  const idEstab = await getUserId();
  api
    .get(`/sections/${idEstab}`)
    .then((response) => {
      dispatch(fetchSuccess(response.data));
      reactotron.log('@fetch_categories', response.data);
    })
    .catch(error => dispatch(fetchFailure(error)));
  // OUTRAS TRATATIVAS
};

// NAVEGAR ATÉ OUTRA TELA
export const fetchSuccess = list => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: list
});

export const fetchFailure = (error) => {
  const errorMessage = getErrorMessage(error);
  return {
    type: FETCH_CATEGORIES_FAILURE,
    payload: errorMessage
  };
};
