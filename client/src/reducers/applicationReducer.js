import {
  GET_APPLICATIONS,
  GET_APPLICATION,
  APPLICATION_LOADING,
  CLEAR_FOR_DASHBOARD,
} from "../actions/types";

const initialState = {
  applications: null,
  application: null,
  applicationloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_FOR_DASHBOARD:
      return {
        applications: null,
        application: null,
        applicationloading: false,
      };
    case APPLICATION_LOADING:
      return {
        ...state,
        applicationloading: true,
      };
    case GET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
        application: null,
        applicationloading: false,
      };
    case GET_APPLICATION:
      return {
        ...state,
        applications: null,
        application: action.payload,
        applicationloading: false,
      };
    default:
      return state;
  }
}
