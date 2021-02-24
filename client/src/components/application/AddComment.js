import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

import {
  getApplicationOfId,
  commentApplication,
} from "../../actions/applicationActions";

import isEmpty from "../../validation/is-empty";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      role: "",
      courseID: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getApplicationOfId(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.application.application) {
      const { application } = nextProps.application;

      application.comment = !isEmpty(application.comment)
        ? application.comment
        : "";
      this.setState({
        comment: application.comment,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const applicationData = {
      comment: this.state.comment,
      role: this.props.auth.user.role,
      courseID: this.state.courseID,
    };

    this.props.commentApplication(
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

    var name;
    if (this.props.application.application) {
      if (this.props.application.application.course) {
        this.state.courseID = this.props.application.application.course._id;
      }
      if (this.props.application.application.profile) {
        name =
          this.props.application.application.profile.firstname +
          " " +
          this.props.application.application.profile.lastname;
      }
    }

    var backButton;
    if (this.props.auth.user.role === "Advisor") {
      backButton = (
        <Link
          to={`/check-applications/${this.state.courseID}`}
          className={"btn btn-light"}
        >
          back
        </Link>
      );
    } else if (this.props.auth.user.role === "Admin") {
      backButton = (
        <Link
          to={`/course-applications/${this.state.courseID}`}
          className={"btn btn-light"}
        >
          back
        </Link>
      );
    }
    return (
      <div className="AddComment">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {backButton}
              <h1 className="display-4 text-center">Application Comment</h1>
              <h3 className="display-5 text-center">for {name}</h3>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="inputComment">Comment</label>
                <TextAreaFieldGroup
                  placeholder="Comment"
                  onChange={this.onChange}
                  value={this.state.comment}
                  name="comment"
                  error={errors.comment}
                  info={
                    "This field can be used to communicate with the Tutoroffice"
                  }
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

AddComment.propTypes = (state) => ({
  application: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  application: state.application,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getApplicationOfId,
  commentApplication,
})(withRouter(AddComment));
