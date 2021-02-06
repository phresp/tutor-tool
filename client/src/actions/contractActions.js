import axios from "axios";

import {
  CONTRACT_LOADING,
  GET_CONTRACT,
  GET_CONTRACTS,
  GET_ERRORS,
  GET_APPLICATIONS,
} from "./types";

//Get all Contracts
export const getContracts = () => (dispatch) => {
  dispatch(setContractLoading());
  axios
    .get("/api/contract/all")
    .then((res) => {
      dispatch({ type: GET_CONTRACTS, payload: res.data });
    })
    .catch((err) =>
      dispatch({
        type: GET_CONTRACTS,
        payload: {},
      })
    );
};

//Get my (Tutor) Contracts
export const getMyContracts = () => (dispatch) => {
  dispatch(setContractLoading());
  axios
    .get("/api/contract")
    .then((res) => {
      dispatch({ type: GET_CONTRACTS, payload: res.data });
    })
    .catch((err) =>
      dispatch({
        type: GET_CONTRACTS,
        payload: {},
      })
    );
};

//Get my (Tutor) Contracts
export const getUserContracts = (id) => (dispatch) => {
  axios
    .get(`/api/contract/contract/userid/${id}`)
    .then((res) => {
      dispatch({ type: GET_CONTRACTS, payload: res.data });
    })
    .catch((err) =>
      dispatch({
        type: GET_CONTRACTS,
        payload: {},
      })
    );
};

//Get Contract of contractID
export const getContractOfID = (id) => (dispatch) => {
  dispatch(setContractLoading());
  axios
    .get(`/api/contract/contract/${id}`)
    .then((res) => dispatch({ type: GET_CONTRACT, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_CONTRACT,
        payload: {},
      })
    );
};

//Get Contracts of user for application ID
export const getContractsForApplication = (id) => (dispatch) => {
  dispatch(setContractLoading());
  axios
    .get(`/api/contract/application/${id}`)
    .then((res) => dispatch({ type: GET_CONTRACTS, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_CONTRACTS,
        payload: {},
      })
    );
};

//Get Contracts of user for application ID
export const getContractsForCourse = (id) => (dispatch) => {
  dispatch(setContractLoading());
  axios
    .get(`/api/contract/course/${id}`)
    .then((res) => dispatch({ type: GET_CONTRACTS, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_CONTRACTS,
        payload: {},
      })
    );
};

//Get Contracts of user for Contract ID
//This will be stored in applications due to design constrains in this application
//This is an exception until i come up with a solution
export const getContractsForContract = (id) => (dispatch) => {
  dispatch(setContractLoading());
  axios
    .get(`/api/contract/contractofid/${id}`)
    .then((res) => dispatch({ type: GET_APPLICATIONS, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_APPLICATIONS,
        payload: {},
      })
    );
};

//Create Contract
export const createContract = (contractData, courseID, history) => (
  dispatch
) => {
  axios
    .post("/api/contract", contractData)
    .then((res) => {
      history.push(`/course-applications/${courseID}`);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Create Contract
export const createSeparateContract = (contractData, history) => (dispatch) => {
  axios
    .post("/api/contract/separatecontract", contractData)
    .then((res) => {
      history.push(`/edit-contract/${res.data}`);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Update Contract
export const updateContract = (id, contractData, history) => (dispatch) => {
  axios
    .post(`/api/contract/update/${id}`, contractData)
    .then((res) => {
      history.push("/contracts");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: { err },
      })
    );
};

//Update Contract
export const deleteContract = (id, history) => (dispatch) => {
  if (window.confirm("Vertrag wirklich löschen?")) {
    axios
      .delete(`/api/contract/deletecontract/${id}`)
      .then((res) => {
        history.push("/contracts");
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: { err },
        })
      );
  }
};

// Contract Loading
export const setContractLoading = () => {
  return {
    type: CONTRACT_LOADING,
  };
};
