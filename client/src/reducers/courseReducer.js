import { GET_COURSE, GET_COURSES } from "../actions/types";

const initialState = {
  course: null,
  courses: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        course: null,
      };
    case GET_COURSE:
      return {
        ...state,
        course: action.payload,
        courses: null,
      };
    default:
      return state;
  }
}
