import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import profileReducer from "./profileReducer";
import semesterReducer from "./semesterReducer";
import metacourseReducer from "./metacourseReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReducer,
  semester: semesterReducer,
  metacourse: metacourseReducer,
});
