import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { getApplicationOfId } from "../../actions/applicationActions";
import { updateApplication } from "../../actions/applicationActions";
import isEmpty from "../../validation/is-empty";
import moment from "moment";
import Moment from "react-moment";
import ExperienceOverview from "../common/ExperienceOverview";
import EducationOverview from "../common/EducationOverview";
import Experience from "../dashboard/Experience";
import Education from "../dashboard/Education";

class AdvisorCourseApplicationView extends Component {
  componentDidMount() {
    this.props.getApplicationOfId(this.props.match.params.id);
  }
  //TODO: Display all information in a nice way and Add Status options
  constructor(props) {
    super(props);
    this.state = {
      grade: "",
      details: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.application.application) {
      const application = nextProps.application.application;

      //If application field doesn't exist, make empty string
      application.grade = !isEmpty(application.grade) ? application.grade : "";
      application.details = !isEmpty(application.details)
        ? application.details
        : "";
      application.course._id = !isEmpty(application.course._id)
        ? application.course._id
        : "";
      application.profile.lastname = !isEmpty(application.profile.lastname)
        ? application.profile.lastname
        : "";
      application.profile.firstname = !isEmpty(application.profile.firstname)
        ? application.profile.firstname
        : "";
      application.profile.matrikelnummner = !isEmpty(
        application.profile.matrikelnummner
      )
        ? application.profile.matrikelnummner
        : "";
      application.profile.gender = !isEmpty(application.profile.gender)
        ? application.profile.gender
        : "";
      application.profile.nationality = !isEmpty(
        application.profile.nationality
      )
        ? application.profile.nationality
        : "";
      application.profile.birthday = !isEmpty(application.profile.birthday)
        ? application.profile.birthday
        : "";
      application.profile.experience = !isEmpty(application.profile.experience)
        ? application.profile.experience
        : [];
      application.profile.education = !isEmpty(application.profile.education)
        ? application.profile.education
        : [];
      application.user.email = !isEmpty(application.user.email)
        ? application.user.email
        : "";

      //Set component fields state
      this.setState({
        grade: application.grade,
        details: application.details,
        courseid: application.course._id,
        lastname: application.profile.lastname,
        firstname: application.profile.firstname,
        matrikelnummer: application.profile.matrikelnummer,
        gender: application.profile.gender,
        nationality: application.profile.nationality,
        birthday: application.profile.birthday,
        experience: application.profile.experience,
        education: application.profile.education,
        email: application.user.email,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const applicationData = {
      grade: this.state.grade,
      details: this.state.details,
    };
    this.props.updateApplication(
      this.props.match.params.id,
      applicationData,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    var linkto;
    const { user } = this.props.auth;
    if (user.role === "Admin") {
      linkto = `/course-applications/${this.state.courseid}`;
    } else {
      linkto = `/check-applications/${this.state.courseid}`;
    }

    //TODO:Buttons to accept and decline application
    var profile = { education: [], experience: [] };
    if (this.props.application.application)
      profile = this.props.application.application.profile;
    return (
      <div className={"Tutoroverview"}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={linkto} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">
                Application of {this.state.firstname} {this.state.lastname}
              </h1>
              <h5>Course Info</h5>
              <p className="lead text-muted">Grade: {this.state.grade} </p>
              <p className="lead text-muted">Details: {this.state.details} </p>
              <h5>Personal Info</h5>
              <p className="lead text-muted">Email: {this.state.email}</p>
              <p className="lead text-muted">
                Matrikelnummer: {this.state.matrikelnummer}
              </p>
              <p className="lead text-muted">
                Birthday:{" "}
                <Moment format="DD/MM/YYYY">
                  {moment.utc(this.state.birthday)}
                </Moment>
              </p>
              <p className="lead text-muted">Gender: {this.state.gender}</p>
              <p className="lead text-muted">
                Nationality: {this.state.nationality}
              </p>
              <div>
                <ExperienceOverview experience={profile.experience} />
                <EducationOverview education={profile.education} />
              </div>
              <div style={{ marginBottom: "60px" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdvisorCourseApplicationView.propTypes = {
  application: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
  course: state.course,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getApplicationOfId,
  updateApplication,
})(AdvisorCourseApplicationView);
