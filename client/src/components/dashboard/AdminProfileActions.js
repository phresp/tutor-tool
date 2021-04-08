import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const AdminProfileActions = (rentals) => {
  var rentalBadge;
  if (rentals.rentals !== null) {
    rentals.rentals.some((e) => {
      if (e.status !== "Done") {
        rentalBadge = <span className="badge badge-danger">!</span>;
      }
    });
  }

  return (
    <div>
      <h6>Personal:</h6>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Profil bearbeiten
        </Link>
      </div>
      <h6>Tutor Management:</h6>
      <div className="dash-buttons btn-group">
        <Link to="/tutor-overview" className="btn btn-light">
          <i className="far fa-address-book text-primary"></i> Tutor Übersicht
        </Link>
        <Link to="/course-overview" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Veranstaltungen
        </Link>
        <Link to="/contracts" className="btn btn-light">
          <i className="fas fa-file-contract text-primary"></i> Verträge
        </Link>
      </div>
      <h6>Setup:</h6>
      <div className="dash-buttons btn-group">
        <Link to="/semester-overview" className="btn btn-light">
          <i className="fas fa-calendar-alt text-primary"></i> Semester
          Übersicht
        </Link>
        <Link to="/metacourse-overview" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i>{" "}
          Metaveranstaltungen
        </Link>
        <Link to="/forms-administration" className="btn btn-light">
          <i className="fas fa-file-pdf text-primary"></i> Formulare
        </Link>
        <Link to="/advisorinvite" className="btn btn-light">
          <i className="fas fa-chalkboard-teacher text-primary"></i>
          Übungsleiter
        </Link>
      </div>
      <h6>Mail:</h6>
      <div className="btn-group">
        <Link to="/send-mail" className="btn btn-light">
          <i className="far fa-envelope text-primary"></i> Mail versenden
        </Link>
        <Link to="/mail-overview" className="btn btn-light">
          <i className="far fa-address-book text-primary"></i> Mail Vorlagen
        </Link>
      </div>
      <h6>Leihen:</h6>
      <div className="btn-group">
        <Link to="/rentals-overview" className="btn btn-light">
          <i className="far fa-envelope text-primary"></i> Verleihübersicht{" "}
          {rentalBadge}
        </Link>
      </div>
    </div>
  );
};

export default AdminProfileActions;
