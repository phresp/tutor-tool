const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCourseInput(data) {
  let errors = {};

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
