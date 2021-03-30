import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import profileReducer from "./profileReducer";
import semesterReducer from "./semesterReducer";
import metacourseReducer from "./metacourseReducer";
import courseReducer from "./courseReducer";
import applicationReducer from "./applicationReducer";
import contractReducer from "./contractReducer";
import formsReducer from "./formsReducer";
import mailReducer from "./mailReducer";
import rentalReducer from "./rentalReducer";
import rentalstatsReducer from "./rentalstatsReducer";

export default combineReducers({
  application: applicationReducer,
  auth: authReducer,
  contract: contractReducer,
  course: courseReducer,
  errors: errorsReducer,
  forms: formsReducer,
  mail: mailReducer,
  metacourse: metacourseReducer,
  profile: profileReducer,
  rentals: rentalReducer,
  rentalstats: rentalstatsReducer,
  semester: semesterReducer,
});
