import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, GET_INVITATION_KEY, SET_CURRENT_USER } from "./types";

//Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Register Advisor
export const registerAdvisor = (userData, id, history) => (dispatch) => {
  axios
    .post(`/api/users/advisorregistration/${id}`, userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//reset Password
export const resetPassword = (userData, history) => (dispatch) => {
  axios.post("/api/users/resetpassword", userData).then((res) => {
    history.push("/login");
  });
};

//change Password
export const changePassword = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/changepassword", userData)
    .then((res) => {
      history.push("/dashboard");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//Get invitation Key
export const getInvitationKey = () => (dispatch) => {
  axios
    .get("/api/users/createinvitationkey")
    .then((res) => {
      dispatch({
        type: GET_INVITATION_KEY,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Log user out
export const logoutUser = () => (dispatch) => {
  //Remove token from localStorage
  localStorage.removeItem("jwtToken");
  //Remove auth header for future requests
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
