import { GET_METACOURSE, GET_METACOURSES } from "../actions/types";

const initialState = {
  metacourse: null,
  metacourses: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_METACOURSES:
      return {
        ...state,
        metacourses: action.payload,
        metacourse: null,
      };
    case GET_METACOURSE:
      return {
        ...state,
        metacourse: action.payload,
        metacourses: null,
      };
    default:
      return state;
  }
}
