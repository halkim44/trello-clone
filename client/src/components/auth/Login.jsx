import React, { useState, useEffect } from 'react';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

const Login = props => {

  const [userLoginForm, setUserLoginForm] = useState({
    email: "",
    password: "",
    errors: {}
  })

  useEffect(() => {
    if (props.auth.isAuthenticated) {

      props.history.push(`/${props.auth.userFullName}/boards`);
    }
    if (props.errors) {
      console.log(props.errors);
      const newObj = Object.assign({}, userLoginForm);
      newObj.errors = props.errors;
      setUserLoginForm(newObj);

    }

  }, [props])

  const onChange = e => {
    const newObj = Object.assign({}, userLoginForm);
    newObj[e.target.id] = e.target.value;
    setUserLoginForm(newObj)
  }

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: userLoginForm.email,
      password: userLoginForm.password
    }
    props.loginUser(userData);
  }
  
  const {errors} = userLoginForm;
  return (
    <div>
      <h1>Login</h1>
      <form noValidate onSubmit={onSubmit}>
        <div>
          <input
            onChange={onChange}
            type="email"
            id="email"
            value={userLoginForm.email}
            placeholder="Enter email"
          />
        </div>
        <div>
          <input 
            onChange={onChange}
            type="password"
            id="password"
            value={userLoginForm.password}
            placeholder="Enter password"
          />
        </div>
        <div>
          <button
            type="submit"
          >
            Log in
          </button>
        </div>
        <div>
            <span>{errors.passwordincorrect}</span>
        </div>
      </form>
 
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);