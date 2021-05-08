const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRentalsInput(data) {
  let errors = {};
  console.log(data);

  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.tumid = !isEmpty(data.tumid) ? data.tumid : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.strasse = !isEmpty(data.strasse) ? data.strasse : "";
  data.plz = !isEmpty(data.plz) ? data.plz : "";
  data.ort = !isEmpty(data.ort) ? data.ort : "";
  data.telefonnummer = !isEmpty(data.telefonnummer) ? data.telefonnummer : "";

  if (Validator.isEmpty(data.lastname)) {
    errors.vorname = "The first name field cannot be empty";
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.name = "The last name field cannot be empty";
  }

  if (Validator.isEmpty(data.tumid)) {
    errors.tumid = "The TUM-ID name field cannot be empty";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "The EMail field cannot be empty";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.strasse)) {
    errors.strasse = "The street field cannot be empty";
  }

  if (Validator.isEmpty(data.plz)) {
    errors.plz = "The city code field cannot be empty";
  }

  if (Validator.isEmpty(data.ort)) {
    errors.ort = "The city code field cannot be empty";
  }

  if (Validator.isEmpty(data.telefonnummer)) {
    errors.telefonnummer = "The telephone number field cannot be empty";
  }

  if (
    !data.ipad &&
    !data.mikrofon &&
    !data.wacom &&
    !data.webcam &&
    !data.stativ
  ) {
    errors.leihgeräte = "You have to select at leat one device";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
