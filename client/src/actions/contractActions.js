import axios from "axios";

import {
  CONTRACT_LOADING,
  GET_CONTRACT,
  GET_CONTRACTS,
  GET_ERRORS,
} from "./types";
import { setApplicationLoading } from "./applicationActions";

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

//Get Contract if contractID
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

//Create Contract
export const createContract = (contractData, history) => (dispatch) => {
  axios
    .post("/api/contract", contractData)
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

// Contract Loading
export const setContractLoading = () => {
  return {
    type: CONTRACT_LOADING,
  };
};
