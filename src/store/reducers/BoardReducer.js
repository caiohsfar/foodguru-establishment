import {
  IS_LOADING_FETCH_BOARDS,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_FAILURE,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE,
  REMOVE_BOARD_SUCCESS,
  TOGGLE_BOARD
} from '../types/BoardTypes';

const INITIAL_STATE = {
  fetchError: false,
  fetchLoadState: false,
  boardList: [],
  selecteds: new Map(),
  selectedCount: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING_FETCH_BOARDS:
      return {
        ...state,
        fetchLoadState: true
      };
    case CREATE_BOARD_SUCCESS:
      return {
        ...state,
        boardList: [...state.boardList, action.payload],
        fetchLoadState: false
      };
    case CREATE_BOARD_FAILURE:
      return {
        ...state,
        fetchLoadState: false
      };
    case FETCH_BOARDS_SUCCESS:
      return {
        ...state,
        boardList: action.payload,
        fetchLoadState: false,
        fetchError: false
      };
    case FETCH_BOARDS_FAILURE:
      return {
        ...state,
        fetchError: true,
        fetchLoadState: false
      };
    case REMOVE_BOARD_SUCCESS:
      return {
        ...state,
        selecteds: new Map(),
        boardList: state.boardList.filter(board => board.id !== action.payload),
        selectedCount: state.selectedCount - 1
      };
    case TOGGLE_BOARD:
      return {
        ...state,
        selecteds: new Map(state.selecteds).set(action.payload.id, action.payload.status),
        selectedCount: action.payload.status ? state.selectedCount + 1 : state.selectedCount - 1
      };
    default:
      return state;
  }
};
