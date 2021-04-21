import React from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import FIELDS from "./surveyField/fieldConstants";
import { withRouter } from "react-router-dom";

const SurveyReview = ({ onCancel, formValues, onSubmit, history }) => {
  console.log(formValues);

  const renderFormFields = FIELDS.map(({ label, name }) => {
    return (
      <div style={{ marginBottom: "20px" }} key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5 style={{ marginBottom: "20px" }}>Please confirm your entires</h5>
      <div>{renderFormFields}</div>
      <button
        className="material-icons yellow darken-2 white-text btn-flat"
        onClick={onCancel}
      >
        {" "}
        Back
      </button>
      <button
        className="green btn-flat white-text right"
        onClick={() => {
          onSubmit(formValues, history);
        }}
      >
        SEND SURVEY <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    formValues: state.form.surveyForm.values,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (values) => dispatch(actions.submitSurvey(values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SurveyReview));
