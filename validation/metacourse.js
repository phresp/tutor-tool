const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSemesterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.abbreviation = !isEmpty(data.abbreviation) ? data.abbreviation : "";
  data.scheme = !isEmpty(data.scheme) ? data.scheme : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Semester field is required";
  }
  if (Validator.isEmpty(data.abbreviation)) {
    errors.abbreviation = "Abbreviation field is required";
  }
  if (Validator.isEmpty(data.scheme)) {
    errors.scheme = "Scheme field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
