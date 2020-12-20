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

//Post new Form
export const uploadFile = (formsData, history) => (dispatch) => {
  axios
    .post(`/api/forms/upload`, formsData)
    .then((res) => {
      history.push("/forms-administration");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: { err },
      })
    );
};

// Application Loading
export const setFormsLoading = () => {
  return {
    type: FORMS_LOADING,
  };
};
