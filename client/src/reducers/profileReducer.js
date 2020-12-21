import {
  CLEAR_CURRENT_PROFILE,
  GET_PROFILE,
  PROFILE_LOADING,
  GET_PROFILES,
  GET_ADVISORS,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  advisors: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        profiles: null,
        loading: false,
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: null,
      };
    case GET_PROFILES:
      return {
        ...state,
        profile: null,
        profiles: action.payload,
        loading: false,
      };
    case GET_ADVISORS:
      return {
        ...state,
        advisors: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
