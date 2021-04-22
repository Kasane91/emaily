import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/surveyActions";

const SurveyList = (props) => {
  useEffect(() => {
    props.fetchSurveys();
  }, [props.fetchSurveys]);

  const renderSurveys = props.surveys.reverse().map((survey) => {
    return (
      <div className="card darken-1 " key={survey._id}>
        <div className="card-content ">
          <span className="card-title">{survey.title}</span>
          <p>{survey.body}</p>
          <p className="right">
            Sent on: {new Date(survey.dateSent).toLocaleDateString()}
          </p>
        </div>
        <div className="card-action">
          <a>Yes: {survey.answer_yes}</a>
          <a>No: {survey.answer_no}</a>
        </div>
      </div>
    );
  });

  return <div>{renderSurveys}</div>;
};

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSurveys: () => dispatch(actions.fetchSurveys()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SurveyList);
