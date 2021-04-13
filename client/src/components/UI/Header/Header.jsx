import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import mailLogo from "../../resources/LogoMakr-6IzQKK.png";
import LoadingSpinner from "../Spinners/LoadingDots";

const Header = (props) => {
  const renderAuthContent = () => {
    switch (props.auth) {
      case null:
        return <LoadingSpinner />;

      case false:
        return <a href="/auth/google">Log in with Google</a>;

      default:
        return <a href="/api/logout">Log Out</a>;
    }
  };
  console.log(props);
  return (
    <nav>
      <div className="nav-wrapper">
        <Link className="left brand-logo" to={props.auth ? "/surveys" : "/"}>
          Emaily
        </Link>

        <ul id="nav-mobile" className="right ">
          <li>{renderAuthContent()}</li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Header);
