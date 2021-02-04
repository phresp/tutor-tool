import React from "react";
import { Link } from "react-router-dom";

const AdvisorActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/advisor-classes" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> My Classes
      </Link>
    </div>
  );
};

export default AdvisorActions;
