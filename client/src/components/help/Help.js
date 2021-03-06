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
              <button className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i> Edit Profile
              </button>{" "}
            </div>

            <h5>Press this button to edit your profile information</h5>
          </div>
          <div className="row">
            <div className="col-md-3">
              <button className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i> Add Experience
              </button>{" "}
            </div>

            <h5>Add work experience that will be shown in you application</h5>
          </div>
          <div className="row">
            <div className="col-md-3">
              <button className="btn btn-light">
                <i className="fas fa-graduation-cap text-primary"></i> Add
                Education
              </button>{" "}
            </div>

            <h5>Add your education that will be shon in your applications </h5>
          </div>
          <div className="row">
            <div className="col-md-3">
              <button className="btn btn-light">
                <i className="fas fa-university text-primary"></i> Tutor
                Application
              </button>{" "}
            </div>

            <h5>
              Check here to see and apply for courses with open tutor positions
            </h5>
          </div>
          <div className="row">
            <div className="col-md-3">
              <button className="btn btn-light">
                <i className="fab fa-pied-piper-hat text-primary"></i> My
                Applications
              </button>{" "}
            </div>
            <h5>Click here to check the status of your application</h5>
          </div>
          <div className="row">
            <div className="col-md-3">
              <button className="btn btn-light">
                <i className="fas fa-scroll text-primary"></i> My Contracts
              </button>{" "}
            </div>

            <h5>
              Here you can check your contracts and see what documents you have
              to provide
            </h5>
          </div>
          <hr />
          <h5 className="text-center">
            For further information please see the provided FAQ-Page below or
            contact the Tutor-Staff via E-Mail
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
