import axios from "axios";
import * as action from "./actionTypes";

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get("/api/current_user");
  dispatch({ type: action.FETCH_USER, payload: response.data });
};
