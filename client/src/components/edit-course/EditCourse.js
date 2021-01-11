import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

import { editCourse, getCourseById } from "../../actions/courseActions";
import { getSemesters } from "../../actions/semesterActions";
import { getMetacourses } from "../../actions/metacourseActions";
import { getAdvisors } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class EditCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metacourse: "",
      semester: "",
      profile: "",
      studentnumber: 0,
      groupnumber: 0,
      groupsize: 0,
      tutorialhours: 0,
      homework: 0,
      exam: 0,
      midterm: 0,
      groupspertutor: 0,
      maxtutornumber: 0,
      weeklyhourspertutor: 0,
      overallhours: 0,
      from: "",
      till: "",
      weeks: "",
      requirement: "",
      admin: "",
      advisor: "",
      status: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getMetacourses();
    this.props.getSemesters();
    this.props.getAdvisors();
    this.props.getCourseById(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.metacourse) {
      const { metacourses } = nextProps.metacourse;
      this.setState({
        metacourses: metacourses,
      });
    }
    if (nextProps.semester) {
      const { semesters } = nextProps.semester;
      this.setState({
        semesters: semesters,
      });
    }
    if (nextProps.profile) {
      const { advisors } = nextProps.profile;
      this.setState({
        advisors: advisors,
      });
    }
    if (nextProps.course.course) {
      const { course } = nextProps.course;
      course.metacoursediff = !isEmpty(course.metacourse.name)
        ? course.metacourse.name
        : "";
      course.semesterdiff = !isEmpty(course.semester.name)
        ? course.semester.name
        : "";
      course.studentnumber = !isEmpty(course.studentnumber)
        ? course.studentnumber
        : "";
      course.groupnumber = !isEmpty(course.groupnumber)
        ? course.groupnumber
        : "";
      course.tutorialhours = !isEmpty(course.tutorialhours)
        ? course.tutorialhours
        : "";
      course.homework = !isEmpty(course.homework) ? course.homework : "";
      course.exam = !isEmpty(course.exam) ? course.exam : "";
      course.groupspertutor = !isEmpty(course.groupspertutor)
        ? course.groupspertutor
        : "";
      course.maxtutornumber = !isEmpty(course.maxtutornumber)
        ? course.maxtutornumber
        : "";
      course.weeklyhourspertutor = !isEmpty(course.weeklyhourspertutor)
        ? course.weeklyhourspertutor
        : "";
      course.overallhours = !isEmpty(course.overallhours)
        ? course.overallhours
        : "";
      course.from = !isEmpty(course.from) ? course.from : "";
      course.till = !isEmpty(course.till) ? course.till : "";
      course.weeks = !isEmpty(course.weeks) ? course.weeks : "";
      course.requirement = !isEmpty(course.requirement)
        ? course.requirement
        : "";
      course.admin = !isEmpty(course.admin) ? course.admin : "";
      course.advisor = !isEmpty(course.advisor) ? course.advisor : "";
      course.status = !isEmpty(course.status) ? course.status : "";

      this.setState({
        metacoursediff: course.metacoursediff,
        semesterdiff: course.semesterdiff,
        studentnumber: course.studentnumber,
        groupnumber: course.groupnumber,
        groupsize: course.groupsize,
        tutorialhours: course.tutorialhours,
        homework: course.homework,
        exam: course.exam,
        midterm: course.midterm,
        groupspertutor: course.groupspertutor,
        maxtutornumber: course.maxtutornumber,
        weeklyhourspertutor: course.weeklyhourspertutor,
        overallhours: course.overallhours,
        from: course.from,
        till: course.till,
        weeks: course.weeks,
        requirement: course.requirement,
        admin: course.admin,
        advisor: course.advisor,
        status: course.status,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const courseData = {
      metacourse: this.state.metacoursediff,
      semester: this.state.semesterdiff,
      studentnumber: this.state.studentnumber,
      groupnumber: this.state.groupnumber,
      groupsize: this.state.groupsize,
      tutorialhours: this.state.tutorialhours,
      homework: this.state.homework,
      exam: this.state.exam,
      midterm: this.state.midterm,
      groupspertutor: this.state.groupspertutor,
      maxtutornumber: this.state.maxtutornumber,
      weeklyhourspertutor: this.state.weeklyhourspertutor,
      overallhours: this.state.overallhours,
      from: this.state.from,
      till: this.state.till,
      weeks: this.state.weeks,
      requirement: this.state.requirement,
      admin: this.state.admin,
      advisor: this.state.advisor,
      status: this.state.status,
    };

    this.props.editCourse(
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
    var { semesters } = this.state;
    var { metacourses } = this.state;
    var { advisors } = this.state;

    //TODO: Calculation of Overall Hours
    this.state.overallhours = this.state.groupsize * this.state.tutorialhours;

    //Select options for semester
    if (!semesters) {
      semesters = [];
    }
    const semesterOptions = semesters.map((el) => {
      return { label: el.name, value: el.name };
    });
    semesterOptions.unshift({ label: "Select Semester", value: "" });

    //Select options for metacourse
    if (!metacourses) {
      metacourses = [];
    }
    const metacourseOptions = metacourses.map((el) => {
      return { label: el.name, value: el.name };
    });
    metacourseOptions.unshift({ label: "Select Metacourse", value: "" });

    //Select options for advisors
    if (!advisors) {
      advisors = [];
    }
    const advisorOptions = advisors.map((el) => {
      return { label: el.firstname + " " + el.lastname, value: el.user._id };
    });
    advisorOptions.unshift({ label: "Select Advisor", value: "" });

    const statusOptions = [
      { label: "Preparation", value: "Preparation" },
      { label: "Open", value: "Open" },
      { label: "Closed", value: "Closed" },
    ];

    return (
      <div className="editCourse">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/class-overview"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Edit Course</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="inputStatus">Status</label>
                <SelectListGroup
                  placeholder="Status"
                  onChange={this.onChange}
                  value={this.state.status}
                  name="status"
                  error={errors.status}
                  options={statusOptions}
                />

                <label htmlFor="inputMetacourse">Metacourse</label>
                <SelectListGroup
                  placeholder="Metacourse"
                  onChange={this.onChange}
                  value={this.state.metacoursediff}
                  name="metacoursediff"
                  error={errors.metacourse}
                  options={metacourseOptions}
                />
                <label htmlFor="inputSemester">Semester</label>
                <SelectListGroup
                  placeholder="Semester"
                  onChange={this.onChange}
                  value={this.state.semesterdiff}
                  name="semesterdiff"
                  error={errors.semester}
                  options={semesterOptions}
                />
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputStudentnumber">
                      Number of Students
                    </label>
                    <TextFieldGroup
                      placeholder="Number of Students"
                      onChange={this.onChange}
                      value={this.state.studentnumber}
                      name="studentnumber"
                      error={errors.studentnumber}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputGroupnumber">Number of Groups</label>
                    <TextFieldGroup
                      placeholder="Number of Groups"
                      onChange={this.onChange}
                      value={this.state.groupnumber}
                      name="groupnumber"
                      error={errors.groupnumber}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputGroupsize">Groupsize</label>
                    <TextFieldGroup
                      placeholder="Groupsize"
                      onChange={this.onChange}
                      value={this.state.groupsize}
                      name="groupsize"
                      error={errors.groupsize}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputTutorialhours">Tutorialhours</label>
                    <TextFieldGroup
                      placeholder="Tutorialhours"
                      onChange={this.onChange}
                      value={this.state.tutorialhours}
                      name="tutorialhours"
                      error={errors.tutorialhours}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputGroupsPerTutor">
                      Groups per Tutor
                    </label>
                    <TextFieldGroup
                      placeholder="Groups per Tutor"
                      onChange={this.onChange}
                      value={this.state.groupspertutor}
                      name="groupspertutor"
                      error={errors.groupspertutor}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputMaxTutorNumber">
                      Max Tutor Number
                    </label>
                    <TextFieldGroup
                      placeholder="* Max Tutor Number"
                      onChange={this.onChange}
                      value={this.state.maxtutornumber}
                      name="maxtutornumber"
                      error={errors.maxtutornumber}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputWeeklyhourspertutor">
                      Weekly Hours per Tutor
                    </label>
                    <TextFieldGroup
                      placeholder="Weekly Hours per Tutor"
                      onChange={this.onChange}
                      value={this.state.weeklyhourspertutor}
                      name="weeklyhourspertutor"
                      error={errors.weeklyhourspertutor}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputHomework">Homework</label>
                    <TextFieldGroup
                      placeholder="Homework"
                      onChange={this.onChange}
                      value={this.state.homework}
                      name="homework"
                      error={errors.homework}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputMidterm">Midterm</label>
                    <TextFieldGroup
                      placeholder="Midterm"
                      onChange={this.onChange}
                      value={this.state.midterm}
                      name="midterm"
                      error={errors.midterm}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputExam">Exam</label>
                    <TextFieldGroup
                      placeholder="Exam"
                      onChange={this.onChange}
                      value={this.state.exam}
                      name="exam"
                      error={errors.exam}
                    />
                  </div>
                </div>
                <label htmlFor="inputOverallhours">Overall Hours</label>
                <TextFieldGroup
                  placeholder="Overall Hours"
                  onChange={this.onChange}
                  value={this.state.overallhours}
                  name="overallhours"
                  error={errors.overallhours}
                  disabled={true}
                />
                <label htmlFor="inputFrom">From</label>
                <TextFieldGroup
                  type={"Date"}
                  placeholder="From"
                  onChange={this.onChange}
                  value={this.state.from}
                  name="from"
                  error={errors.from}
                />
                <label htmlFor="inputTill">Till</label>
                <TextFieldGroup
                  type={"Date"}
                  placeholder="Till"
                  onChange={this.onChange}
                  value={this.state.till}
                  name="till"
                  error={errors.till}
                />
                <label htmlFor="inputRequirements">Requirements</label>
                <TextFieldGroup
                  placeholder="Requirements"
                  onChange={this.onChange}
                  value={this.state.requirement}
                  name="requirement"
                  error={errors.requirement}
                />
                <label htmlFor="inputAdvisor">Advisor</label>
                <SelectListGroup
                  placeholder="Advisor"
                  onChange={this.onChange}
                  value={this.state.advisor}
                  name="advisor"
                  error={errors.advisor}
                  options={advisorOptions}
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

EditCourse.propTypes = (state) => ({
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
  editCourse,
  getSemesters,
  getMetacourses,
  getAdvisors,
  getCourseById,
})(withRouter(EditCourse));
