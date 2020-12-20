import axios from "axios";

import { GET_FORMS, GET_FORM, GET_ERRORS, FORMS_LOADING } from "./types";

//Get all Forms
export const getForms = () => (dispatch) => {
  dispatch(setFormsLoading());
  axios
    .get("/api/forms/all")
    .then((res) => dispatch({ type: GET_FORMS, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_FORMS,
        payload: {},
      })
    );
};

// Application Loading
export const setFormsLoading = () => {
  return {
    type: FORMS_LOADING,
  };
};
