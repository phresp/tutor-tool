const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMailInput(data) {
  let errors = {};

  data.to = !isEmpty(data.to) ? data.to : "";
  data.subject = !isEmpty(data.subject) ? data.subject : "";
  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.to)) {
    errors.to = "Empfänger Feld darf nicht leer sein!";
  }
  if (Validator.isEmpty(data.subject)) {
    errors.subject = "Betreff Feld darf nicht leer sein!";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text Feld darf nicht leer sein!";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
