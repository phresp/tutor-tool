import { GET_APPLICATIONS } from "../actions/types";

const initialState = {
  applications: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
      };
    default:
      return state;
  }
}
