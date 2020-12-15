import {
  GET_CONTRACTS,
  GET_CONTRACT,
  CONTRACT_LOADING,
} from "../actions/types";

const initialState = {
  contracts: null,
  contract: null,
  contractloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CONTRACT_LOADING:
      return {
        ...state,
        contractloading: true,
      };
    case GET_CONTRACTS:
      return {
        ...state,
        contracts: action.payload,
        contract: null,
        applicationloading: false,
      };
    case GET_CONTRACT:
      return {
        ...state,
        contracts: null,
        contract: action.payload,
        applicationloading: false,
      };
    default:
      return state;
  }
}
