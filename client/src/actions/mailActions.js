import axios from "axios";

import {
  GET_TEMPLATES,
  TEMPLATES_LOADING,
  GET_ERRORS,
  GET_TEMPLATE,
} from "./types";

//Get all semester
export const getTemplates = () => (dispatch) => {
  dispatch(setTemplatesLoading());
  axios
    .get("/api/mail/templates/all")
    .then((res) => dispatch({ type: GET_TEMPLATES, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_TEMPLATES,
        payload: {},
      })
    );
};

//Get template of id
export const getTemplateById = (id) => (dispatch) => {
  dispatch(setTemplatesLoading());
  axios
    .get(`/api/mail/template/${id}`)
    .then((res) => dispatch({ type: GET_TEMPLATE, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_TEMPLATE,
        payload: {},
      })
    );
};

//Create Template
export const createTemplate = (templateData, history) => (dispatch) => {
  axios
    .post("/api/mail/template", templateData)
    .then((res) => {
      history.push("/mail-overview");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Edit Template
export const editTemplate = (id, templateData, history) => (dispatch) => {
  axios
    .post(`/api/mail/updatetemplate/${id}`, templateData)
    .then((res) => {
      history.push("/mail-overview");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Send Testmail
export const sendMail = (mailData, history) => (dispatch) => {
  axios
    .post(`/api/mail/sendmail`, mailData)
    .then((res) => {
      history.push("/dashboard");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Template Loading
export const setTemplatesLoading = () => {
  return {
    type: TEMPLATES_LOADING,
  };
};
