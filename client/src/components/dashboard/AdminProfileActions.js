import React from "react";
import { Link } from "react-router-dom";

const AdminProfileActions = () => {
  return (
    <div>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
        <Link to="/tutor-overview" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Tutor Overview
        </Link>
        <Link to="/class-overview" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Class Overview
        </Link>
        <Link to="/contracts" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Contracts
        </Link>
      </div>

      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
        <Link to="/tutor-overview" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Tutor Overview
        </Link>
        <Link to="/class-overview" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Class Overview
        </Link>
        <Link to="/contracts" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Contracts
        </Link>
      </div>
    </div>
  );
};

export default AdminProfileActions;
