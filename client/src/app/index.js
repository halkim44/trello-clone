import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { setAuthToken } from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";

import store from "../store";
import Landing from "../pages/Landing";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Board from "../pages/Board/index";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; // get in miliseconds

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}
const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path={`/:userFullName/boards`} component={Home} />
        <PrivateRoute path="/b/:boardId/:boardName" component={Board} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
