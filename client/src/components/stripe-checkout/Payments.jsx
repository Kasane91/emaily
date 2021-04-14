import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import StripeCheckout from "react-stripe-checkout";

const PaymentWrapper = (props) => {
  const { onHandleToken } = props;

  return (
    <StripeCheckout
      amount={500}
      token={(token) => onHandleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
      name="Emaily"
      description="5 email credits for $5"
    >
      <button
        className="btn red darken-2
       "
      >
        Add Credits
      </button>
    </StripeCheckout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleToken: (token) => dispatch(actions.handleToken(token)),
  };
};

export default connect(null, mapDispatchToProps)(PaymentWrapper);
