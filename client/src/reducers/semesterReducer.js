import { GET_SEMESTER } from "../actions/types";

const initialState = {
  semester: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SEMESTER:
      return {
        ...state,
        semester: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
