import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { Logo } from "../components/layout/Logo";
import { Link } from "react-router-dom";
import isEmpty from "is-empty";

const Login = ({ auth, history, errors, loginUser }) => {
  const [userLoginForm, setUserLoginForm] = useState({
    email: "",
    password: "",
    errors: {},
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push(`/${auth.userFullName}/boards`);
    }
    if (errors.login && isEmpty(userLoginForm.errors)) {
      setUserLoginForm({ ...userLoginForm, errors: errors });
    }
  }, [auth, errors]);

  const onChange = (e) => {
    const newObj = Object.assign({}, userLoginForm);
    newObj[e.target.id] = e.target.value;
    setUserLoginForm(newObj);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setUserLoginForm({ ...userLoginForm });
    const userData = {
      email: userLoginForm.email,
      password: userLoginForm.password,
    };
    loginUser(userData);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-page-logo-wrapper container has-text-centered">
        <Logo isLink={false} color={"info"} />
      </div>
      <div className="container form-wrapper has-background-white">
        <h2 className="has-text-centered is-size-6">Log in to Mello</h2>
        <form onSubmit={onSubmit}>
          {!isEmpty(userLoginForm.errors) && (
            <div className="field has-background-danger-light">
              <span>{userLoginForm.errors.login}</span>
            </div>
          )}

          <div className="field">
            <div className="control">
              <input
                className="input"
                type="email"
                id="email"
                value={userLoginForm.email}
                placeholder="Enter email"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="field">
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Enter password"
              value={userLoginForm.password}
              onChange={onChange}
            />
          </div>
          <div>
            <button className="button is-fullwidth is-success" type="submit">
              Log in
            </button>
          </div>
        </form>
        <hr />
        <div className="has-text-centered">
          <Link to="/register" className="has-text-info">
            Sign up for an account
          </Link>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
