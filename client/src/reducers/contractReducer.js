import {
  GET_CONTRACTS,
  GET_CONTRACT,
  CONTRACT_LOADING,
  CLEAR_FOR_DASHBOARD,
} from "../actions/types";

const initialState = {
  contracts: null,
  contract: null,
  contractloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_FOR_DASHBOARD:
      return {
        contracts: null,
        contract: null,
        contractloading: false,
      };
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
        contractloading: false,
      };
    case GET_CONTRACT:
      return {
        ...state,
        contracts: null,
        contract: action.payload,
        contractloading: false,
      };
    default:
      return state;
  }
}
