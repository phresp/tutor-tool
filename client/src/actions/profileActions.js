import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  CLEAR_FOR_DASHBOARD,
  SET_CURRENT_USER,
  GET_ERRORS,
  GET_PROFILES,
  GET_ADVISORS,
} from "./types";

//Get current profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

//Get profile of id
export const getProfile = (id) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/profile/${id}`)
    .then((res) => {
      console.log(res);
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

//Get all profiles
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/profiles/all")
    .then((res) => dispatch({ type: GET_PROFILES, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: {},
      })
    );
};

//Get all advisors
export const getAdvisors = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/role/advisor")
    .then((res) => dispatch({ type: GET_ADVISORS, payload: res.data }))
    .catch((err) => {
      dispatch({
        type: GET_ADVISORS,
        payload: {},
      });
    });
};

//CreateProfile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("api/profile", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Add Experience
export const addExperience = (expData, history) => (dispatch) => {
  axios
    .post("api/profile/experience", expData)
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

//Add Education
export const addEducation = (eduData, history) => (dispatch) => {
  axios
    .post("api/profile/education", eduData)
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

//Delete Experience
export const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`api/profile/experience/${id}`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Delete Experience
export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`api/profile/education/${id}`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Delete Account & Profile
export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("api/profile")
      .then((res) =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch((err) =>
        dispatch({ type: GET_ERRORS, payload: err.response.data })
      );
  }
};

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

// Clear all for Dashboard
export const clearForDashboard = () => {
  return {
    type: CLEAR_FOR_DASHBOARD,
  };
};
