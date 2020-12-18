import React from "react";
import { Link } from "react-router-dom";

const StudentProfileActions = () => {
  return (
    <div>
      <h6>Personal Actions</h6>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie text-primary"></i> Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Add Education
        </Link>
      </div>
      <h6>Tutor Actions</h6>
      <div className="dash-buttons">
        <Link to="/tutorapplication" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Tutor
          Application
        </Link>
        <Link to="/myapplications" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> My Applications
        </Link>
        <Link to="/mycontracts" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> My Contracts
        </Link>
      </div>
    </div>
  );
};

export default StudentProfileActions;
