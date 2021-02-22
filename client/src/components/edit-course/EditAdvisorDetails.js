import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

import { editCourseDetails, getCourseById } from "../../actions/courseActions";
import { getSemesters } from "../../actions/semesterActions";
import { getMetacourses } from "../../actions/metacourseActions";
import { getAdvisors, getAdmins } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class EditAdvisorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      requirement: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCourseById(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.course.course) {
      const { course } = nextProps.course;

      course.requirement = !isEmpty(course.requirement)
        ? course.requirement
        : "";
      course.details = !isEmpty(course.details) ? course.details : "";

      this.setState({
        requirement: course.requirement,
        details: course.details,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const courseData = {
      requirement: this.state.requirement,
      details: this.state.details,
    };

    this.props.editCourseDetails(
      this.props.match.params.id,
      courseData,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="editCourseDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/check-applications/${this.props.match.params.id}`}
                className={"btn btn-light"}
              >
                back
              </Link>
              <h1 className="display-4 text-center">Edit Details</h1>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="inputRequirements">Requirements</label>
                <TextAreaFieldGroup
                  placeholder="Requirements"
                  onChange={this.onChange}
                  value={this.state.requirement}
                  name="requirement"
                  error={errors.requirement}
                />
                <label htmlFor="inputRequirements">Details</label>
                <TextAreaFieldGroup
                  placeholder="Details"
                  onChange={this.onChange}
                  value={this.state.details}
                  name="details"
                  error={errors.details}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditAdvisorDetails.propTypes = (state) => ({
  semester: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  metacourse: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  metacourse: state.metacourse,
  course: state.course,
  semester: state.semester,
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  editCourseDetails,
  getSemesters,
  getMetacourses,
  getAdvisors,
  getCourseById,
  getAdmins,
})(withRouter(EditAdvisorDetails));
