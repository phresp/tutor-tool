import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Help extends Component {
  render() {
    return (
      <div className="help">
        <div className="container">
          <Link to={"/dashboard"} className={"btn btn-light"}>
            back
          </Link>
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Help</h1>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i> Edit Profile
              </Link>
            </div>

            <h5>Click here to edit your profile information</h5>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Link to="/add-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i> Add Experience
              </Link>
            </div>

            <h5>Add work experience (will be shown in your applications)</h5>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Link to="/add-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-primary"></i> Add
                Education
              </Link>
            </div>

            <h5>Add your education (will be shown in your applications) </h5>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Link to="/tutorapplication" className="btn btn-light">
                <i className="fas fa-university text-primary"></i> Tutor
                Application
              </Link>
            </div>

            <h5>
              Check here to see and apply for courses with vacant tutor
              positions
            </h5>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Link to="/myapplications" className="btn btn-light">
                <i className="fab fa-pied-piper-hat text-primary"></i> My
                Applications
              </Link>
            </div>
            <h5>Click here to check the status of your applications</h5>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Link to="/mycontracts" className="btn btn-light">
                <i className="fas fa-scroll text-primary"></i> My Contracts
              </Link>
            </div>

            <h5>
              Check your contracts and see which documents you have to provide
            </h5>
          </div>

          <div className="row">
            <div className="col-md-3">
              <Link to="/createrentalapplication" className="btn btn-light">
                <i className="fas fa-scroll text-primary"></i> Apply for Rental
              </Link>
            </div>

            <h5>Apply for free rental equipment for your tutorials </h5>
          </div>
          <hr />
          <h5 className="text-center">
            For further information please see the FAQ page linked below or
            contact the Tutorbetrieb via E-Mail
          </h5>
        </div>
      </div>
    );
  }
}

Help.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps)(Help);
