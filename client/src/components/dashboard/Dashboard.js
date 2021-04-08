import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import StudentProfileActions from "./StudentProfileActions";
import AdminProfileActions from "./AdminProfileActions";
import AdvisorActions from "./AdvisorActions";
import Experience from "./Experience";
import Education from "./Education";

import {
  getCurrentProfile,
  clearForDashboard,
} from "../../actions/profileActions";

import { getRentalsapplications } from "../../actions/rentalActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.clearForDashboard();
    if (this.props.auth.user.role === "Admin") {
      this.props.getRentalsapplications();
    }
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    var rentalapplications;
    if (this.props.auth.user.role === "Admin") {
      rentalapplications = this.props.rentals.rentalapplications;
    }

    let dashboardContent;

    var aufenthaltToolTipp;
    var stipendiumToolTipp;
    if (profile) {
      if (profile.aufenthaltend) {
        if (new Date(profile.aufenthaltend) < Date.now()) {
          aufenthaltToolTipp = (
            <h3 className="text-danger">Aufenthaltstitel abgelaufen!</h3>
          );
        }
      }
    }

    if (profile) {
      if (profile.stipendiumend) {
        if (
          new Date(profile.stipendiumend) < Date.now() &&
          profile.stipendiumend
        ) {
          stipendiumToolTipp = (
            <h3 className="text-danger">Stipendium abgelaufen!</h3>
          );
        }
      }
    }

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        if (user.role === "Student") {
          var experience;
          var education;
          if (
            profile.experience.length !== 0 ||
            profile.education.length !== 0
          ) {
            experience = <Experience experience={profile.experience} />;
            education = <Education education={profile.education} />;
          } else {
            experience = (
              <h3>
                If you add any experience or education it will show up here
              </h3>
            );
          }

          dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome {profile.firstname}</p>
              {aufenthaltToolTipp}
              {stipendiumToolTipp}
              <StudentProfileActions />
              <hr />
              <div>
                {experience}
                {education}
              </div>
              <div style={{ marginBottom: "60px" }} />
            </div>
          );
        } else if (user.role === "Admin") {
          dashboardContent = (
            <div>
              <p className="lead text-muted">Willkommen {profile.firstname}</p>
              <AdminProfileActions rentals={rentalapplications} />
            </div>
          );
        } else if (user.role === "Advisor") {
          dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome {profile.firstname}</p>
              <AdvisorActions />
            </div>
          );
        } else if (user.role === "RBG") {
          this.props.history.push("/rentals-overview");
        }
      } else {
        // User is logged in but hast no profile
        if (user.role === "Student") {
          dashboardContent = (
            <div>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-lg btn-info">
                Create Profile
              </Link>
            </div>
          );
        } else {
          dashboardContent = (
            <div>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-advisorprofile" className="btn btn-lg btn-info">
                Create Profile
              </Link>
            </div>
          );
        }
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard </h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  clearForDashboard: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  rentals: state.rentals,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  clearForDashboard,
  getRentalsapplications,
})(Dashboard);
