import React from "react";
import { Link } from "react-router-dom";

const AdminProfileActions = () => {
  return (
    <div>
      <h6>Personal:</h6>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
      </div>
      <h6>Tutor Management:</h6>
      <div className="dash-buttons">
        <Link to="/tutor-overview" className="btn btn-light">
          <i className="far fa-address-book text-primary"></i> Tutor Overview
        </Link>
        <Link to="/course-overview" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Course Overview
        </Link>
        <Link to="/contracts" className="btn btn-light">
          <i className="fas fa-file-contract text-primary"></i> Contracts
        </Link>
      </div>
      <h6>Setup:</h6>
      <div className="dash-buttons">
        <Link to="/semester-overview" className="btn btn-light">
          <i className="fas fa-calendar-alt text-primary"></i> Semester Overview
        </Link>
        <Link to="/metacourse-overview" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Metacourses
        </Link>
        <Link to="/forms-administration" className="btn btn-light">
          <i className="fas fa-file-pdf text-primary"></i> Forms
        </Link>
        <Link to="/contracts" className="btn btn-light">
          <i className="fab fa-accessible-icon text-primary"></i> Test
        </Link>
      </div>
    </div>
  );
};

export default AdminProfileActions;
