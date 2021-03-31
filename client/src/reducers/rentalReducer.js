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
        rentalapplications: null,
        rentalapplication: null,
        loading: false,
      };
    case GET_RENTAL:
      return {
        ...state,
        rentals: null,
        rental: action.payload,
        rentalapplications: null,
        rentalapplication: null,
        loading: false,
      };
    case GET_RENTALAPPLICATION:
      return {
        ...state,
        rentals: null,
        rental: null,
        rentalapplications: null,
        rentalapplication: action.payload,
        loading: false,
      };
    case GET_RENTALAPPLICATIONS:
      return {
        ...state,
        rentals: null,
        rental: null,
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
