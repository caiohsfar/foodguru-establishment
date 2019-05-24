import { Alert, Platform } from 'react-native';
import reactotron from 'reactotron-react-native';
import getErrorMessage from '../../utils/getErrorMessage';

import {
  IS_LOADING_FETCH_BOARDS,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_FAILURE,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE,
  REMOVE_BOARD_FAILURE,
  REMOVE_BOARD_SUCCESS,
  TOGGLE_BOARD
} from '../types/BoardTypes';

import api from '../../services/api';
import { getUserId } from '../../services/userServices';

export const remove = id => async (dispatch) => {
  try {
    await api.put(`/tables/delete/${id}`);
    dispatch(onRemoveSuccess(id));
  } catch (error) {
    dispatch(onRemoveFailure(error));
  }
};

const onRemoveFailure = (error) => {
  const message = getErrorMessage(error);
  return {
    type: REMOVE_BOARD_FAILURE,
    payload: message
  };
};

const onRemoveSuccess = id => ({
  type: REMOVE_BOARD_SUCCESS,
  payload: id
});

export const toggle = (id, status) => ({
  type: TOGGLE_BOARD,
  payload: { id, status }
});

export const isLoading = () => ({
  type: IS_LOADING_FETCH_BOARDS
});

export const create = (table) => async (dispatch) => {
  dispatch(isLoading());
  const id = await getUserId();
  reactotron.log(table);
  api
    .post('/tables', { table, id })
    .then((response) => {
      dispatch(createSuccess({...table, id: response.data.id }));
    })
    .catch(error => dispatch(createFailure(error)));
  // OUTRAS TRATATIVAS
};

export const createSuccess = table => ({
  type: CREATE_BOARD_SUCCESS,
  payload: table
});

export const createFailure = (error) => {
  const errorMessage = getErrorMessage(error);
  Alert.alert('Erro!', errorMessage);
  return {
    type: CREATE_BOARD_FAILURE,
    payload: errorMessage
  };
};

export const fetch = () => async (dispatch) => {
  dispatch(isLoading());
  const id = await getUserId();
  api
    .get(`/tables/${id}`)
    .then((response) => {
      dispatch(fetchSuccess(response.data));
    })
    .catch(error => dispatch(fetchFailure(error)));
  // OUTRAS TRATATIVAS
};
// NAVEGAR ATÉ OUTRA TELA
export const fetchSuccess = list => ({
  type: FETCH_BOARDS_SUCCESS,
  payload: list
});

export const fetchFailure = (error) => {
  const errorMessage = getErrorMessage(error);
  return {
    type: FETCH_BOARDS_FAILURE,
    payload: errorMessage
  };
};
