import {
  GET_METACOURSE,
  GET_METACOURSES,
  METACOURSE_LOADING,
  CLEAR_FOR_DASHBOARD,
} from "../actions/types";

const initialState = {
  metacourse: null,
  metacourses: null,
  metacourseloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_FOR_DASHBOARD:
      return {
        metacourse: null,
        metacourses: null,
        metacourseloading: false,
      };
    case METACOURSE_LOADING:
      return {
        ...state,
        metacourseloading: true,
      };
    case GET_METACOURSES:
      return {
        ...state,
        metacourses: action.payload,
        metacourse: null,
        metacourseloading: false,
      };
    case GET_METACOURSE:
      return {
        ...state,
        metacourse: action.payload,
        metacourses: null,
        metacourseloading: false,
      };
    default:
      return state;
  }
}
