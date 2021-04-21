import React from "react";
import SurveyField from "../surveys/surveyField/surveyField";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "./surveyField/fieldConstants";

const SurveyForm = (props) => {
  const renderFields = () => {
    return FIELDS.map(({ label, name }) => {
      return (
        <Field
          type="text"
          component={SurveyField}
          name={name}
          label={label}
          key={label}
        />
      );
    });
  };

  return (
    <div>
      <form onSubmit={props.handleSubmit(() => props.onSurveySubmit())}>
        {renderFields()}
        <Link to="/surveys" className="red accent-2 btn-flat white-text">
          Cancel
        </Link>
        <button className="teal btn-flat right white-text" type="submit">
          Next <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
};

const validate = (values) => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
