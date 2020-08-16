import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

const Register = props => {
  const [userData, setuserData] = useState({
    fullName: "",
    email: "",
    password: "",
    errors: {}
  })

  useEffect(() => {
    setuserData(Object.assign(userData, {errors: props.errors}))
  }, [userData, props.errors])

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

  const { errors } = userData;
  return (
        <div>
          <h1>Register</h1>
          <form onSubmit={onSubmit}>
            <div>
              <input
                onChange={onChange}
                value={userData.name}
                error={errors.name}
                id="fullName"
                type="text"
                className={classnames("", {
                  invalid: errors.name
                })}
              />
              <label htmlFor="fullName">Name</label>
              <span className="red-text">{errors.name}</span>
            </div>
            <div>
              <input
                onChange={onChange}
                value={userData.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email
                })}
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">{errors.email}</span>
            </div>
            <div>
              <input
                onChange={onChange}
                value={userData.password}
                error={errors.password}
                id="password"
                type="password"

                className={classnames("", {
                  invalid: errors.password
                })}
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">{errors.password}</span>
            </div>
            <div>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
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
