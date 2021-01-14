import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../layout/Logo";

export const GuestMenu = () => {
  return (
    <>
      <div className="level-left">
        <div className="level-item">
          <Logo isLink={true} color={"white"} />
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <Link className="button is-info has-text-white" to="/login">
            Log In
          </Link>
        </div>
        <div className="level-item">
          <Link to="/register" className="button is-white has-text-info">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};
