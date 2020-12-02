import { GET_APPLICATIONS, GET_APPLICATION } from "../actions/types";

const initialState = {
  applications: null,
  application: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
        application: null,
      };
    case GET_APPLICATION:
      return {
        ...state,
        applications: null,
        application: action.payload,
      };
    default:
      return state;
  }
}
