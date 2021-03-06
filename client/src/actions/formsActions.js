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

//download advisor tutor data export for course
export const TutorDataExport = (id) => (dispatch) => {
  axios({
    url: `/api/forms/cfaexcel/${id}`,
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

//download advisor tutor data export for course
export const TutorDataCSVExport = (id) => (dispatch) => {
  axios({
    url: `/api/forms/cfacsv/${id}`,
    method: "POST",
    responseType: { "Content-Type": "multipart/form-data" },
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Tutordata.csv`);
    document.body.appendChild(link);
    link.click();
  });
};

//download admin tutor data export for course
export const TutorAdminDataExport = (id) => (dispatch) => {
  axios({
    url: `/api/forms/cfaadminexcel/${id}`,
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

//download Contract Data of Semester
export const SemesterContractDataExport = (semData) => (dispatch) => {
  axios({
    url: `/api/forms/scdexcel`,
    method: "POST",
    responseType: "blob",
    data: semData,
  }).then((response) => {
    console.log(semData);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Tutordata-${semData[0].label}.xlsx`);
    document.body.appendChild(link);
    link.click();
  });
};

//download degvo data for tutor
export const DSGVOExport = (id) => (dispatch) => {
  axios({
    url: `/api/forms/dsgvocsv/${id}`,
    method: "POST",
    responseType: { "Content-Type": "multipart/form-data" },
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `DSGVOInfo.csv`);
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
