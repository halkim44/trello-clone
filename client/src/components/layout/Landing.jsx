import React from 'react';
import { Link } from 'react-router-dom';


export const Landing = () => (
  <div>
    <h1>Hello, Welcome!</h1>
      <Link to="/login">
        Login
      </Link>
      <Link to="/register">
        Register
      </Link>

  </div>
)