import {
  CLEAR_FOR_DASHBOARD,
  GET_TEMPLATES,
  GET_TEMPLATE,
  TEMPLATES_LOADING,
} from "../actions/types";

const initialState = {
  templates: null,
  template: null,
  templatesloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_FOR_DASHBOARD:
      return {
        templates: null,
        template: null,
        templatesloading: false,
      };
    case TEMPLATES_LOADING:
      return {
        ...state,
        templatesloading: true,
      };
    case GET_TEMPLATES:
      return {
        ...state,
        templates: action.payload,
        template: null,
        templatesloading: false,
      };
    case GET_TEMPLATE:
      return {
        ...state,
        template: action.payload,
        templates: null,
        templatesloading: false,
      };
    default:
      return state;
  }
}
