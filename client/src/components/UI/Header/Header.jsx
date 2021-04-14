import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Payments from "../../stripe-checkout/Payments";

import LoadingSpinner from "../Spinners/LoadingDots";

const Header = (props) => {
  const renderAuthContent = () => {
    switch (props.auth) {
      case null:
        return (
          <li>
            <LoadingSpinner />
          </li>
        );

      case false:
        return (
          <li>
            <a href="/auth/google">Log in with Google</a>
          </li>
        );

      default:
        return [
          <li key="PaymentLink">
            <Payments />
          </li>,
          <li style={{ margin: "0 10px" }} key="credits_number">
            Credits: {props.auth.credits}
          </li>,
          <li key="LogoutLink">
            <a href="/api/logout">Log Out</a>
          </li>,
        ];
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
          {renderAuthContent()}
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
