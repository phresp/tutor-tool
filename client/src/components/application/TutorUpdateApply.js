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

class TutorUpdateApply extends Component {
  componentDidMount() {
    this.props.getApplicationOfId(this.props.match.params.id);
  }
  //TODO: Add information about the course you apply for
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
      console.log(nextProps.application);
      console.log(application.application);

      //If application field doesn't exist, make empty string
      application.grade = !isEmpty(application.grade) ? application.grade : "";
      application.details = !isEmpty(application.details)
        ? application.details
        : "";

      //Set component fields state
      this.setState({
        grade: application.grade,
        details: application.details,
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
    const { errors } = this.state;
    const gradeOptions = [
      { label: "No selection", value: "No grade" },
      { label: "1.0", value: "1.0" },
      { label: "1.3", value: "1.3" },
      { label: "1.7", value: "1.7" },
      { label: "2.0", value: "2.0" },
      { label: "2.3", value: "2.3" },
      { label: "2.7", value: "2.7" },
      { label: "3.0", value: "3.0" },
      { label: "3.3", value: "3.3" },
      { label: "3.7", value: "3.7" },
      { label: "4.0", value: "4.0" },
    ];

    return (
      <div className={"Tutorapply"}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/myapplications"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Update Application</h1>

              <form onSubmit={this.onSubmit}>
                <label htmlFor="inputGrade">Your Grade</label>
                <SelectListGroup
                  placeholder="Grader"
                  onChange={this.onChange}
                  value={this.state.grade}
                  name="grade"
                  error={errors.grade}
                  options={gradeOptions}
                />
                <label htmlFor="inputDetails">
                  Additional Details for your Application
                </label>
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

TutorUpdateApply.propTypes = {
  application: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
  course: state.course,
});

export default connect(mapStateToProps, {
  getApplicationOfId,
  updateApplication,
})(TutorUpdateApply);
