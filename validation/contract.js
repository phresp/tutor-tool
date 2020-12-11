const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateContractInput(data) {
  let errors = {};

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
