import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { Logo } from "../layout/Logo";
import isEmpty from "is-empty";

const Register = props => {
  const [userData, setuserData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(props.errors.signup) {
      setErrors(props.errors);
    }
  }, [props])

  const onChange = e => {
    const newObj = Object.assign({}, userData);
    newObj[e.target.id] = e.target.value
    setuserData(newObj);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      "full_name": userData.fullName,
      "email": userData.email,
      "password": userData.password,
    };
    props.registerUser(newUser, props.history);
  };

  
  return (

    <div className="auth-page-wrapper">
      <div className="auth-page-logo-wrapper container has-text-centered">
        <Logo isLink={false} color={'info'} />
      </div>
      <div className="container form-wrapper has-background-white">
        <h2 className="has-text-centered is-size-6">Sign up for your account</h2>
        <form onSubmit={onSubmit}>

          {
            !isEmpty(errors) && 
            <div className="field has-background-danger-light">
              <span>{errors.signup}</span>
            </div>
          }
        
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="email"
                id="email"
                placeholder="Enter email address" 
                onChange={onChange}
                value={userData.email}
              />
            </div>
          </div>
    
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                id="fullName"
                placeholder="Enter full name" 
                onChange={onChange}
                value={userData.fullName}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="password"
                id="password"
                placeholder="Create password"
                onChange={onChange}
                value={userData.password}
              />
            </div>
          </div>
          <div>
            <button className="button is-fullwidth is-success">Sign up</button>
          </div>
        </form>
        <hr />
        <div className="has-text-centered">
          <Link to='/login' className='has-text-info'>
          Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register))
