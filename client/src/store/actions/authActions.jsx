import axios from "axios";
import * as action from "./actionTypes";

export const fetchUser = () => {
  return (dispatch) => {
    axios.get("/api/current_user").then((response) => {
      dispatch({ type: action.FETCH_USER, payload: response });
    });
  };
};
