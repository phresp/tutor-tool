import axios from "axios";

import { GET_APPLICATIONS, GET_ERRORS } from "./types";

//Get all Applications
export const getApplications = () => (dispatch) => {
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

//Post Application
export const postApplication = (id) => (dispatch) => {
  axios
    .post("/api/application/:id")
    .then((res) => dispatch({ type: GET_APPLICATIONS, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: { err },
      })
    );
};
