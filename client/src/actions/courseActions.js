import axios from "axios";

import { GET_COURSE, GET_ERRORS, GET_COURSES } from "./types";

//Get all Course
export const getCourses = () => (dispatch) => {
  axios
    .get("/api/course/")
    .then((res) => dispatch({ type: GET_COURSES, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_COURSES,
        payload: {},
      })
    );
};

//Get Course of id
export const getCourseById = (id) => (dispatch) => {
  axios
    .get(`/api/course/${id}`)
    .then((res) => dispatch({ type: GET_COURSE, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_COURSE,
        payload: {},
      })
    );
};

//Create Course
export const createCourse = (courseData, history) => (dispatch) => {
  axios
    .post("/api/course", courseData)
    .then((res) => {
      history.push("/course-overview");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Edit Course
export const editCourse = (id, courseData, history) => (dispatch) => {
  axios
    .post(`/api/course/${id}`, courseData)
    .then((res) => {
      history.push("/course-overview");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
