import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getTutorApplications } from "../../actions/applicationActions";
import { getCoursesForApplication } from "../../actions/courseActions";
import { postApplication } from "../../actions/applicationActions";

class TutorApply extends Component {
  render() {
    return (
      <div>
        <h1>moin</h1>
      </div>
    );
  }
}

TutorApply.propTypes = {};

const mapStateToProps = (state) => ({
  application: state.application,
  course: state.course,
});

export default connect(mapStateToProps, {})(TutorApply);
