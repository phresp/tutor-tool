import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const ContractSelectListGroup = ({
  name,
  value,
  error,
  info,
  onChange,
  options,
  disabled,
  color,
}) => {
  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  var col = (obj) => {
    if (obj === "Fehlt") {
      return "contract-red";
    } else if (obj === "Liegt vor") {
      return "contract-green";
    } else if (obj === "Liegt bei") {
      return "contract-blue";
    } else {
      return "bg-light";
    }
  };
  return (
    <div className="form-group">
      <select
        className={classnames(
          "form-control form-control-lg",
          {
            "is-invalid": error,
          },
          col(color)
        )}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

ContractSelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default ContractSelectListGroup;
