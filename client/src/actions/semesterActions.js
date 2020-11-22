import axios from "axios";

import { GET_SEMESTER } from "./types";
import { setProfileLoading } from "./profileActions";

//Get all semester
export const getSemester = () => (dispatch) => {
  axios
    .get("/api/semester/")
    .then((res) => dispatch({ type: GET_SEMESTER, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_SEMESTER,
        payload: {},
      })
    );
};
