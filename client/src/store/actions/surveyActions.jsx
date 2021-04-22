import * as actions from "../actions/actionTypes";
import axios from "axios";

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/surveys", values);

  history.push("/surveys");
  dispatch({ type: actions.FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const response = await axios.get("api/surveys");

  dispatch({ type: actions.FETCH_SURVEY, payload: response.data });
};
