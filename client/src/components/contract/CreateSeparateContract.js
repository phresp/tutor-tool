import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import {
  createSeparateContract,
  getUserContracts,
} from "../../actions/contractActions";

import { getCourses } from "../../actions/courseActions";

import { getTutors } from "../../actions/profileActions";

import isEmpty from "../common/is-empty";

class CreateSeparateContract extends Component {
  componentDidMount() {
    this.props.getTutors();
    this.props.getCourses();
  }

  constructor(props) {
    super(props);
    this.state = {
      tutors: "",
      courses: "",
      user: "",
      profile: "",
      course: "",
      status: "Created",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const contractData = {
      user: this.state.user,
      profile: this.state.profile,
      course: this.state.course,
      status: this.state.status,
    };
    console.log("yes");
    this.props.createSeparateContract(contractData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile) {
      const { tutors } = nextProps.profile;
      this.setState({
        tutors: tutors,
      });
    }

    if (nextProps.course) {
      const { courses } = nextProps.course;
      this.setState({
        courses: courses,
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    var { tutors, courses } = this.state;

    //Select options for tutors
    if (isEmpty(tutors)) {
      tutors = [];
    }
    const tutorOptions = tutors.map((el) => {
      return { label: el.firstname + " " + el.lastname, value: el._id };
    });
    tutorOptions.unshift({ label: "Student auswählen", value: "" });

    //Set User for selected Tutor
    if (this.state.profile) {
      var index = tutors.filter((x) => x._id == this.state.profile);
      if (index[0].user._id != this.state.user) {
        this.setState({ user: index[0].user._id });
      }
    }

    //Select options for courses
    if (isEmpty(courses)) {
      courses = [];
    }
    const courseOptions = courses.map((el) => {
      return {
        label: el.metacourse[0].name + ", " + el.semester[0].name,
        value: el._id,
      };
    });

    courseOptions.unshift({ label: "Kurs auswählen", value: "" });

    //Select options for status of contract
    const statusOptions = [
      { label: "Erstellt", value: "Created" },
      { label: "Unvollständig", value: "Incomplete" },
      { label: "In Bearbeitung", value: "In Process" },
      { label: "Unterschriftsbereit", value: "Signable" },
      { label: "Abgeschlossen", value: "Completed" },
    ];

    return (
      <div className="createContract">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/contracts"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">
                Leeren Vertrag Erstellen
              </h1>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="inputStudent">Student</label>
                <SelectListGroup
                  placeholder="Student"
                  onChange={this.onChange}
                  value={this.state.profile}
                  name="profile"
                  error={errors.profile}
                  options={tutorOptions}
                />
                <label htmlFor="inputourse">Kurs</label>
                <SelectListGroup
                  placeholder="Kurs"
                  onChange={this.onChange}
                  value={this.state.course}
                  name="course"
                  error={errors.course}
                  options={courseOptions}
                />
                <label htmlFor="status">Status:</label>
                <SelectListGroup
                  placeholder="status"
                  onChange={this.onChange}
                  value={this.state.status}
                  name="status"
                  error={errors.status}
                  options={statusOptions}
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
CreateSeparateContract.propTypes = (state) => ({
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  application: state.application,
  contract: state.contract,
  profile: state.profile,
  course: state.course,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  createSeparateContract,
  getTutors,
  getUserContracts,
  getCourses,
})(withRouter(CreateSeparateContract));
