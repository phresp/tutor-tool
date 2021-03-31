import {
  GET_RENTALS,
  GET_RENTAL,
  GET_RENTALAPPLICATION,
  GET_RENTALAPPLICATIONS,
  DELETE_RENTAL,
} from "../actions/types";

const initialState = {
  rentals: null,
  rental: null,
  rentalapplication: null,
  rentalapplications: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RENTALS:
      return {
        ...state,
        rentals: action.payload,
        rental: null,
        loading: false,
      };
    case GET_RENTAL:
      return {
        ...state,
        rentals: null,
        rental: action.payload,
        loading: false,
      };
    case GET_RENTALAPPLICATION:
      return {
        ...state,
        rentalapplications: null,
        rentalapplication: action.payload,
        loading: false,
      };
    case GET_RENTALAPPLICATIONS:
      return {
        ...state,
        rentalapplication: null,
        rentalapplications: action.payload,
        loading: false,
      };
    case DELETE_RENTAL:
      return {
        ...state,
        rentals: state.rentals.filter(
          (rentals) => rentals._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
