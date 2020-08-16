import {
  SET_CURRENT_USER,
  USER_LOADING
} from "../actions/types";

const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  userFullName: ''
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        userFullName: isEmpty(action.payload) ? "" : action.payload.full_name.replace(/\s/g, '')
      };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
  }
}