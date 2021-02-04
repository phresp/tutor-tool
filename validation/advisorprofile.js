const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAdvisorProfileInput(data) {
  let errors = {};

  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Lastname field is required";
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "Firstname field is required";
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
