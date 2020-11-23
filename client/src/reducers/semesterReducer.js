import { GET_SEMESTER, GET_SEMESTERS } from "../actions/types";

const initialState = {
  semester: null,
  semesters: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SEMESTERS:
      return {
        ...state,
        semesters: action.payload,
        semester: null,
      };
    case GET_SEMESTER:
      return {
        ...state,
        semester: action.payload,
        semesters: null,
      };
    default:
      return state;
  }
}
