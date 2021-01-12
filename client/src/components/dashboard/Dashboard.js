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
  deleteAccount,
  clearForDashboard,
} from "../../actions/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.clearForDashboard();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        if (user.role === "Student") {
          dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome {profile.firstname}</p>
              <StudentProfileActions />
              <hr />
              <div>
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
              </div>
              <div style={{ marginBottom: "60px" }} />
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
              >
                {" "}
                Delete My Account
              </button>
            </div>
          );
        } else if (user.role === "Admin") {
          dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome {profile.firstname}</p>
              <AdminProfileActions />
            </div>
          );
        } else if (user.role === "Advisor") {
          dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome {profile.firstname}</p>
              <AdvisorActions />
            </div>
          );
        }
      } else {
        // User is logged in but hast no profile
        dashboardContent = (
          <div>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
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
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  clearForDashboard,
})(Dashboard);
