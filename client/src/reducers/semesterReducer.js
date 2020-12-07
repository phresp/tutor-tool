import {
  GET_SEMESTER,
  GET_SEMESTERS,
  SEMESTER_LOADING,
} from "../actions/types";

const initialState = {
  semester: null,
  semesters: null,
  semesterloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEMESTER_LOADING:
      return {
        ...state,
        semesterloading: true,
      };
    case GET_SEMESTERS:
      return {
        ...state,
        semesters: action.payload,
        semester: null,
        semesterloading: false,
      };
    case GET_SEMESTER:
      return {
        ...state,
        semester: action.payload,
        semesters: null,
        semesterloading: false,
      };
    default:
      return state;
  }
}
