const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.birthday = !isEmpty(data.birthday) ? data.birthday : "";

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Lastname field is required";
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "Firstname field is required";
  }

  if (Validator.isEmpty(data.birthday)) {
    errors.birthday = "Birthday field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
