import {
  GET_METACOURSE,
  GET_METACOURSES,
  METACOURSE_LOADING,
} from "../actions/types";

const initialState = {
  metacourse: null,
  metacourses: null,
  metacourseloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
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
