const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSemesterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.coursefrom = !isEmpty(data.coursefrom) ? data.coursefrom : "";
  data.courseto = !isEmpty(data.courseto) ? data.courseto : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Semester field is required";
  }
  if (!Validator.isLength(data.name, { min: 4, max: 4 })) {
    errors.name = "Semester Name must be 4 characters";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }
  if (Validator.isEmpty(data.to)) {
    errors.to = "To field is required";
  }
  if (Validator.isEmpty(data.coursefrom)) {
    errors.coursefrom = "Courses From field is required";
  }
  if (Validator.isEmpty(data.courseto)) {
    errors.courseto = "Courses To field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
