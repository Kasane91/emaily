import axios from "axios";
import * as action from "./actionTypes";

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get("/api/current_user");

  dispatch({ type: action.FETCH_USER, payload: response.data });
};

export const handleToken = (token) => async (dispatch) => {
  const response = await axios.post("/api/stripe", token);

  dispatch({ type: action.FETCH_USER, payload: response.data });
};
