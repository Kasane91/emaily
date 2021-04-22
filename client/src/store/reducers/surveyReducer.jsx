import * as actions from "../actions/actionTypes";

const initialState = [];

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_SURVEY:
      return action.payload;

    default:
      return state;
  }
};

export default surveyReducer;
