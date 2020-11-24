import axios from "axios";

import { GET_METACOURSE, GET_ERRORS, GET_METACOURSES } from "./types";

//Get all Metacourse
export const getMetacourses = () => (dispatch) => {
  axios
    .get("/api/metacourse/")
    .then((res) => dispatch({ type: GET_METACOURSES, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_METACOURSES,
        payload: {},
      })
    );
};

//Get Metacourse of id
export const getMetacourseById = (id) => (dispatch) => {
  axios
    .get(`/api/metacourse/${id}`)
    .then((res) => dispatch({ type: GET_METACOURSE, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_METACOURSE,
        payload: {},
      })
    );
};

//Create Metacourse
export const createMetacourse = (metacourseData, history) => (dispatch) => {
  axios
    .post("/api/metacourse", metacourseData)
    .then((res) => {
      history.push("/metacourse-overview");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Edit Metacourse
export const editMetacourse = (id, metacourseData, history) => (dispatch) => {
  axios
    .post(`/api/metacourse/${id}`, metacourseData)
    .then((res) => {
      history.push("/metacourse-overview");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
