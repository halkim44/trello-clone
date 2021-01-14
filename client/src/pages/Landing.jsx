import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TopMenu } from "../components/TopMenu";

const Landing = ({ auth }) => {
  return (
    <>
      {auth.isAuthenticated ? (
        <Redirect to={`/${auth.userFullName}/boards`} />
      ) : (
        <div>
          <TopMenu />
          <section className="hero is-info is-fullheight">
            <div className="hero-body  has-text-center-mobile">
              <div className="container">
                <h1 className="title is-size-2">
                  Mello lets you work more collaboratively and get more done.
                </h1>
                <p className="subtitle is-size-4">
                  Trello’s boards, lists, and cards enable you to organize and
                  prioritize your projects in a fun, flexible, and rewarding
                  way.
                </p>
                <Link to="/register">
                  <button className="button is-success is-size-5">
                    Sign Up ― It&apos;s Free!
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
