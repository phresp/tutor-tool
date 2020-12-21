import { GET_FORM, GET_FORMS, FORMS_LOADING } from "../actions/types";

const initialState = {
  form: null,
  forms: null,
  formsloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FORMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_FORM:
      return {
        ...state,
        form: action.payload,
        loading: false,
      };
    case GET_FORMS:
      return {
        ...state,
        forms: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}