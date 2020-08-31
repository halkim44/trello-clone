import React, { useState, useEffect } from 'react';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Logo } from '../layout/Logo';
import { Link } from 'react-router-dom';
import isEmpty from 'is-empty';

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
    if (props.errors.login) {
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
    setUserLoginForm({},)
    const userData = {
      email: userLoginForm.email,
      password: userLoginForm.password
    }
    props.loginUser(userData);
  }
  
  const {errors} = userLoginForm;
  return (
    <div className="auth-page-wrapper">
      <div className="auth-page-logo-wrapper container has-text-centered">
        <Logo isLink={false} color={'info'} />
      </div>
      <div className="container form-wrapper has-background-white">
        <h2 className="has-text-centered is-size-6">Log in to Mello</h2>
        <form onSubmit={onSubmit}>
    
          {
            !isEmpty(errors) && 
            <div className="field has-background-danger-light">
              <span>{errors.login}</span>
            </div>
          }

          <div class="field">
            <div class="control">
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
            <button class="button is-fullwidth is-success">Log in</button>
          </div>
        </form>
        <hr />
        <div className="has-text-centered">
          <Link to='/register' className='has-text-info'>
            Sign up for an account
          </Link>
        </div>
      </div>
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