import axios from "axios";

import { GET_SEMESTER, GET_ERRORS, GET_SEMESTERS } from "./types";

//Get all semester
export const getSemesters = () => (dispatch) => {
  axios
    .get("/api/semester/")
    .then((res) => dispatch({ type: GET_SEMESTERS, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_SEMESTERS,
        payload: {},
      })
    );
};

//Get semester of id
export const getSemesterById = (id) => (dispatch) => {
  axios
    .get(`/api/semester/${id}`)
    .then((res) => dispatch({ type: GET_SEMESTER, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_SEMESTER,
        payload: {},
      })
    );
};

//Create Semester
export const createSemester = (semesterData, history) => (dispatch) => {
  axios
    .post("/api/semester", semesterData)
    .then((res) => {
      history.push("/semester-overview");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Edit Semester
export const editSemester = (id, semesterData, history) => (dispatch) => {
  axios
    .post(`/api/semester/${id}`, semesterData)
    .then((res) => {
      history.push("/semester-overview");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
