import axios from "axios";

import { GET_COURSE, GET_ERRORS, GET_COURSES, COURSE_LOADING } from "./types";

//Get all Course
export const getCourses = () => (dispatch) => {
  dispatch(setCourseLoading());
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

//Get all Courses for Tutors
export const getCoursesForApplication = () => (dispatch) => {
  dispatch(setCourseLoading());
  axios
    .get("/api/course/status/openforapply")
    .then((res) => {
      dispatch({ type: GET_COURSES, payload: res.data });
    })
    .catch((err) =>
      dispatch({
        type: GET_COURSES,
        payload: {},
      })
    );
};

//Get all Courses for Advisor
export const getAdvisorCourses = () => (dispatch) => {
  dispatch(setCourseLoading());
  axios
    .get("/api/course/advisor/mycourses")
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
  dispatch(setCourseLoading());
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

//Edit Course
export const editCourseDetails = (id, courseData, history) => (dispatch) => {
  axios
    .post(`/api/course/advisoredit/${id}`, courseData)
    .then((res) => {
      if (courseData.role === "Advisor") {
        history.push(`/check-applications/${id}`);
      } else if (courseData.role === "Admin") {
        history.push(`/course-applications/${id}`);
      }
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Application Loading
export const setCourseLoading = () => {
  return {
    type: COURSE_LOADING,
  };
};
