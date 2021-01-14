import React from "react";
import { GuestMenu } from "./GuestMenu";
import { UserMenu } from "./UserMenu";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const TopMenuComponent = (props) => {
  const { auth } = props;

  return (
    // navbar when user is logged in
    <header
      id="top-bar"
      className={`has-background-info${auth.isAuthenticated ? "-dark" : ""} ${
        auth.isAuthenticated ? " user-tools-active" : ""
      }`}
    >
      <nav className="level is-mobile">
        {auth.isAuthenticated ? (
          <UserMenu userData={auth.user} />
        ) : (
          <GuestMenu />
        )}
      </nav>
    </header>
  );
};

TopMenuComponent.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export const TopMenu = connect(mapStateToProps)(TopMenuComponent);
