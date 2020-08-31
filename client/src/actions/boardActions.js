import { api } from '../api';
import { SET_BOARD_LIST, GET_ERRORS } from './types';

export const addBoard = boardData => dispatch => {

  api
    .post('/board', boardData)
    .then(res => {
      console.log(res);
    })
}

export const getBoardList = userId => dispatch => {
  api
    .post('/user/boards', { userId: userId })
    .then(res => {
      dispatch(setCurrentBoards(res.data.data))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );  
}

export const setCurrentBoards = boards => ({
  type: SET_BOARD_LIST,
  payload: boards
})
