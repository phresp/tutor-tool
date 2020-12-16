import axios from "axios";

import { GET_CONTRACT, GET_CONTRACTS, GET_ERRORS } from "./types";

//Get all Contracts
export const getContracts = () => (dispatch) => {
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
