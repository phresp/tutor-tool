import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import profileReducer from "./profileReducer";
import semesterReducer from "./semesterReducer";
import metacourseReducer from "./metacourseReducer";
import courseReducer from "./courseReducer";
import applicationReducer from "./applicationReducer";
import contractReducer from "./contractReducer";

export default combineReducers({
  application: applicationReducer,
  auth: authReducer,
  contract: contractReducer,
  course: courseReducer,
  errors: errorsReducer,
  metacourse: metacourseReducer,
  profile: profileReducer,
  semester: semesterReducer,
});
