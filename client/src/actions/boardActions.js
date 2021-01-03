import { serverAPI } from "../services/serverAPI";
import { SET_BOARD_LIST, GET_ERRORS } from "./types";

export const addBoard = (boardData) => (dispatch) => {
  serverAPI.post("/board", boardData).then((res) => {
    console.log(res);
  });
};

export const getBoardList = (userId) => (dispatch) => {
  serverAPI
    .post("/user/boards", { userId: userId })
    .then((res) => {
      dispatch(setCurrentBoards(res.data.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCurrentBoards = (boards) => ({
  type: SET_BOARD_LIST,
  payload: boards,
});
