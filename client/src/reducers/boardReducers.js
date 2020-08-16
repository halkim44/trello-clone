import {
  SET_BOARD_LIST
} from "../actions/types";

const isEmpty = require('is-empty');

const initialState = {
  boards: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_BOARD_LIST:
      return {
        ...state,
        boards: action.payload
      };
      default:
        return state;
  }
}