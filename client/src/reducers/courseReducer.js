import {
  GET_COURSE,
  GET_COURSES,
  COURSE_LOADING,
  CLEAR_FOR_DASHBOARD,
} from "../actions/types";

const initialState = {
  course: null,
  courses: null,
  courseloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_FOR_DASHBOARD:
      return {
        course: null,
        courses: null,
        courseloading: false,
      };
    case COURSE_LOADING:
      return {
        ...state,
        courseloading: true,
      };
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        course: null,
        courseloading: false,
      };
    case GET_COURSE:
      return {
        ...state,
        course: action.payload,
        courses: null,
        courseloading: false,
      };
    default:
      return state;
  }
}
