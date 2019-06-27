import { Alert, Platform } from 'react-native';
import reactotron from 'reactotron-react-native';
import getErrorMessage from '../../utils/getErrorMessage';

import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  IS_LOADING_FETCHING_ORDERS,
  ADD_TO_PROGRESS,
  FINALIZE_SUCCESS,
  FINALIZE_FAILURE,
  ADD_TO_MADE
} from '../types/OrderTypes';

import api from '../../services/api';
import { getUserId } from '../../services/userServices';

export const addToProgress = item => ({
  type: ADD_TO_PROGRESS,
  payload: item
});

export const addToMade = item => ({
  type: ADD_TO_MADE,
  payload: item
}); 

export const finalize = id => async (dispatch) => {
  try {
    await api.put(`consumptionItems/delete/${id}`);
    dispatch(onFinalizeSuccess(id));
  } catch (error) {
    dispatch(onFinalizeFailure());
  }
};

const onFinalizeFailure = (error) => {
  const message = getErrorMessage(error);
  Alert.alert('Erro', message);
  return {
    type: FINALIZE_FAILURE,
    payload: message
  };
};

const onFinalizeSuccess = id => ({
  type: FINALIZE_SUCCESS,
  payload: id
});

export const fetchOrders = () => async (dispatch) => {
  dispatch(isLoading());
  try {
    const id = await getUserId();
    const { data } = await api.get(`/establishments/consumptionItems/${id}`);
    dispatch(onFetchSuccess(data));
  } catch (error) {
    dispatch(onFetchFailure(error));
  }
};

const onFetchFailure = (error) => {
  const message = getErrorMessage(error);
  Alert.alert('Erro', message);
  return {
    type: FETCH_ORDERS_FAILURE,
    payload: message
  };
};

const onFetchSuccess = items => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: items
});

export const isLoading = () => ({
  type: IS_LOADING_FETCHING_ORDERS
});
