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

export const downloadPdf = (formData) => (dispatch) => {
  axios({
    url: "/api/forms/download",
    method: "POST",
    responseType: "blob",
    data: formData,
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${formData.name}.pdf`);
    document.body.appendChild(link);
    link.click();
  });
};

//download Einstellungsvorschlag
export const downloadEV = (evData) => (dispatch) => {
  axios({
    url: "/api/forms/downloadev",
    method: "POST",
    responseType: "blob",
    data: evData,
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Einstellungsvorschlag-${evData.lastname}.pdf`
    );
    document.body.appendChild(link);
    link.click();
  });
};

//download advisor tutor data export
export const advisorTutorDataExport = (id) => (dispatch) => {
  axios({
    url: `/api/forms/advisorexcel/${id}`,
    method: "POST",
    responseType: "blob",
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Tutordata.xlsx`);
    document.body.appendChild(link);
    link.click();
  });
};

// Application Loading
export const setFormsLoading = () => {
  return {
    type: FORMS_LOADING,
  };
};
