const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.birthday = !isEmpty(data.birthday) ? data.birthday : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.nationality = !isEmpty(data.nationality) ? data.nationality : "";
  // data.matrikelnummer = !isEmpty(data.matrikelnummer)
  //   ? data.matrikelnummer
  //   : "";

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Lastname field is required";
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "Firstname field is required";
  }

  if (Validator.isEmpty(data.birthday)) {
    errors.birthday = "Birthday field is required";
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  if (Validator.isEmpty(data.nationality)) {
    errors.nationality = "Yout Nationality is required";
  }

  // if (Validator.isEmpty(data.matrikelnummer)) {
  //   errors.matrikelnummer = "Your Matrikelnummer is required";
  // }
  //
  // if (!Validator.isLength(data.matrikelnummer, { min: 7, max: 8 })) {
  //   errors.matrikelnummer =
  //     "Your Matrikelnumber must be between 7 and 8 characters";
  // }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
