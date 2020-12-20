import axios from "axios";

import {
  GET_APPLICATIONS,
  GET_APPLICATION,
  GET_ERRORS,
  APPLICATION_LOADING,
} from "./types";

//Get all Applications
export const getApplications = () => (dispatch) => {
  dispatch(setApplicationLoading());
  axios
    .get("/api/application/all")
    .then((res) => dispatch({ type: GET_APPLICATIONS, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_APPLICATIONS,
        payload: {},
      })
    );
};

//Get Applications of Tutor
export const getTutorApplications = () => (dispatch) => {
  dispatch(setApplicationLoading());
  axios
    .get("/api/application")
    .then((res) => dispatch({ type: GET_APPLICATIONS, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_APPLICATIONS,
        payload: {},
      })
    );
};

//Get Application for course of Tutor
export const getTutorApplicationForCourse = (id) => (dispatch) => {
  dispatch(setApplicationLoading());
  axios
    .get(`/api/application/${id}`)
    .then((res) => dispatch({ type: GET_APPLICATION, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_APPLICATION,
        payload: {},
      })
    );
};

//Get Application if applicationID
export const getApplicationOfId = (id) => (dispatch) => {
  dispatch(setApplicationLoading());
  axios
    .get(`/api/application/apply/${id}`)
    .then((res) => dispatch({ type: GET_APPLICATION, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_APPLICATION,
        payload: {},
      })
    );
};

//Get Application for applicationID of Tutor
export const getApplicationsOfCourse = (id) => (dispatch) => {
  dispatch(setApplicationLoading());
  axios
    .get(`/api/application/course/${id}`)
    .then((res) => dispatch({ type: GET_APPLICATIONS, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_APPLICATIONS,
        payload: {},
      })
    );
};

//Post new Application
export const postApplication = (id, applicationData, history) => (dispatch) => {
  axios
    .post(`/api/application/${id}`, applicationData)
    .then((res) => {
      history.push("/myaplications");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: { err },
      })
    );
};

//UpdateApplication
export const updateApplication = (id, applicationData, history) => (
  dispatch
) => {
  axios
    .post(`/api/application/update/${id}`, applicationData)
    .then((res) => {
      history.push("/myapplications");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: { err },
      })
    );
};

//AcceptApplication
export const acceptApplication = (id, course) => (dispatch) => {
  axios
    .post(`/api/application/accept/${id}`)
    .then((res) => {
      console.log("before get");
      dispatch(getApplicationsOfCourse(course));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: { err },
      })
    );
};

// Application Loading
export const setApplicationLoading = () => {
  return {
    type: APPLICATION_LOADING,
  };
};
