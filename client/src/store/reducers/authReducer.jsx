import * as actions from "../actions/actionTypes";

const initialState = "";

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
