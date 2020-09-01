import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import store from '../../store';

export const Navbar = () => {

  const {auth} = store.getState();

  return (
  // navbar when user is logged in
    <header id="top-bar" className={`has-background-info${auth.isAuthenticated? "-dark" : ""} ${auth.isAuthenticated? " user-tools-active" : ""}`}>
      <nav className="level is-mobile">
        {auth.isAuthenticated ?
          <>
            <div className="level-left">
              
              <Link to="/">
                <span className="has-text-info-light">
                  Home
                </span>
              </Link>
            </div>
            <div className="center"><Logo isLink={true} color='info-light' size='3'/></div>
            <div className="right has-text-info-light">
              <span>
                {auth.user.full_name}
              </span>
            </div>
          </>
        :
          <>
            <div className="level-left">
              <div className="level-item">
                <Logo isLink={true} color={'white'}/>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <Link className="button is-info has-text-white" to='/login'>
                  Log In
                </Link>
              </div>
              <div className="level-item">
                <Link to='/register' className="button is-white has-text-info">
                    Sign Up
                </Link>
              </div>
            </div>
          </>
        }
      </nav>
    </header>
  )
}