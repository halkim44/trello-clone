import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import boardReducers from "./boardReducers";
export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  boards: boardReducers
});