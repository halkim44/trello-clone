import React from 'react';
import { Switch, Route, withRouter, Link} from 'react-router-dom';

import jwt_decode from "jwt-decode";
import {setAuthToken} from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";

import store from '../store';
import Landing from '../components/layout/Landing';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import PrivateRoute from '../components/private-route/PrivateRoute';
import Home from '../components/layout/Home';
import { Board } from '../components/layout/Board';
import { getBoardList } from '../actions/boardActions';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getBoardList(decoded.id));
  const currentTime = Date.now() / 1000; // get in miliseconds

  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}
const App = props => {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      {store.getState().auth.isAuthenticated &&
        <Route path={`/b/`} component={ Board } />
      }
      
      <Switch>
        <PrivateRoute exact path={`/${store.getState().auth.userFullName}/boards`} component={ Home } />
        <PrivateRoute exact path="/home" component={ Home } />

      </Switch>
    </div>
  );
}

export default withRouter(App);
