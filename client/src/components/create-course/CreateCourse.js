import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import isEmpty from "../common/is-empty";

import { createCourse } from "../../actions/courseActions";
import { getSemesters } from "../../actions/semesterActions";
import { getMetacourses } from "../../actions/metacourseActions";
import { getAdvisors, getAdmins } from "../../actions/profileActions";

class CreateCourse extends Component {
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
      groupspertutor: 1,
      maxtutornumber: 0,
      weeklyhourspertutor: 0,
      overallweeklyhours: 0,
      overallhours: 0,
      basehours: 3,
      from: "",
      till: "",
      weeks: 1,
      requirement: "",
      admin: "",
      advisor: "",
      advisor2: "",
      advisor3: "",
      status: "",
      manualmaxtutor: false,
      manualweekly: false,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getMetacourses();
    this.props.getSemesters();
    this.props.getAdvisors();
    this.props.getAdmins();
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
      const { advisors, admins } = nextProps.profile;
      this.setState({
        advisors: advisors,
        admins: admins,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const courseData = {
      metacourse: this.state.metacourse,
      semester: this.state.semester,
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
      overallweeklyhours: this.state.overallweeklyhours,
      from: this.state.from,
      till: this.state.till,
      weeks: this.state.weeks,
      requirement: this.state.requirement,
      admin: this.state.admin,
      advisor: this.state.advisor,
      advisor2: this.state.advisor2,
      advisor3: this.state.advisor3,
      status: this.state.status,
    };

    this.props.createCourse(courseData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    var { semesters } = this.state;
    var { metacourses } = this.state;
    var { advisors } = this.state;
    var { admins } = this.state;

    //Select options for Midterm
    const midtermOptions = [
      { label: "0", value: "0" },
      { label: "0.5", value: "0.5" },
    ];

    //Select options for Exam
    const examOptions = [
      { label: "0", value: "0" },
      { label: "1", value: "1" },
    ];

    //Select options for Status
    const statusOptions = [
      { label: "Vorbereitung", value: "Preparation" },
      { label: "Offen", value: "Open" },
      { label: "Geschlossen", value: "Closed" },
      { label: "Archiv", value: "Archive" },
    ];

    var tutorialmin = Math.min(2, this.state.tutorialhours);

    if (!this.state.manualweekly) {
      this.state.weeklyhourspertutor =
        this.state.basehours * 1 +
        this.state.exam * 1 +
        this.state.midterm * 1 +
        this.state.tutorialhours * this.state.groupspertutor +
        tutorialmin * this.state.groupspertutor * this.state.homework;
    }

    this.state.overallweeklyhours =
      this.state.maxtutornumber * this.state.weeklyhourspertutor;

    this.state.overallhours = this.state.overallweeklyhours * this.state.weeks;

    if (!this.state.manualmaxtutor) {
      this.state.maxtutornumber =
        this.state.groupnumber / this.state.groupspertutor;
    }

    //Select options for semester
    if (!semesters) {
      semesters = [];
    }
    const semesterOptions = semesters.map((el) => {
      return { label: el.name, value: el.name };
    });
    semesterOptions.unshift({ label: "Semester auswählen", value: "" });
    //Select options for metacourse
    if (!metacourses) {
      metacourses = [];
    }
    const metacourseOptions = metacourses.map((el) => {
      return { label: el.name, value: el.name };
    });
    metacourseOptions.unshift({ label: "Metakurs auswählen", value: "" });

    //Select options for advisors
    if (isEmpty(advisors)) {
      advisors = [];
    }
    const advisorOptions = advisors.map((el) => {
      return { label: el.firstname + " " + el.lastname, value: el.user._id };
    });
    advisorOptions.unshift({ label: "Übungsleiter auswählen", value: "" });

    //Select options for admins
    if (isEmpty(admins)) {
      admins = [];
    }
    const adminOptions = admins.map((el) => {
      return { label: el.firstname + " " + el.lastname, value: el.user._id };
    });
    adminOptions.unshift({ label: "Betreuer auswählen", value: "" });

    return (
      <div className="createCourse">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/course-overview"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Veranstaltung erstellen</h1>
              <small className="d-block pb-3">* = benötigte Felder</small>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="inputMetacourse4">Metakurs</label>
                <SelectListGroup
                  placeholder="Metakurs"
                  onChange={this.onChange}
                  value={this.state.metacourse}
                  name="metacourse"
                  error={errors.metacourse}
                  options={metacourseOptions}
                />
                <label htmlFor="inputSemester">Semester</label>
                <SelectListGroup
                  placeholder="Semester"
                  onChange={this.onChange}
                  value={this.state.semester}
                  name="semester"
                  error={errors.semester}
                  options={semesterOptions}
                />
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputStudentnumber">Anzahl Studenten</label>
                    <TextFieldGroup
                      placeholder="Number of Students"
                      onChange={this.onChange}
                      value={this.state.studentnumber}
                      name="studentnumber"
                      error={errors.studentnumber}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputGroupnumber">Anzahl Gruppen</label>
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
                    <label htmlFor="inputGroupsize">Gruppengöße</label>
                    <TextFieldGroup
                      placeholder="Groupsize"
                      onChange={this.onChange}
                      value={this.state.groupsize}
                      name="groupsize"
                      error={errors.groupsize}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputTutorialhours">Dauer Tutorium</label>
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
                      Gruppen pro Tutor
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
                    <label htmlFor="inputHomework">Hausaufgaben</label>
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
                    <SelectListGroup
                      placeholder="Midterm"
                      onChange={this.onChange}
                      value={this.state.midterm}
                      name="midterm"
                      error={errors.midterm}
                      options={midtermOptions}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputExam">Klausur</label>
                    <SelectListGroup
                      placeholder="Exam"
                      onChange={this.onChange}
                      value={this.state.exam}
                      name="exam"
                      error={errors.exam}
                      options={examOptions}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputMaxTutorNumber">
                      Maximale Anzahl Tutoren -{" "}
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="maxTutorNumber"
                          onChange={() => {
                            this.setState((prevState) => ({
                              manualmaxtutor: !prevState.manualmaxtutor,
                            }));
                          }}
                          value={this.state.manualmaxtutor}
                        />
                        <label className="form-check-label" htmlFor="wacom">
                          Manuelle Eingabe
                        </label>
                      </div>
                    </label>
                    <TextFieldGroup
                      placeholder="* Maximale Anzahl Tutoren"
                      onChange={this.onChange}
                      value={this.state.maxtutornumber}
                      name="maxtutornumber"
                      error={errors.maxtutornumber}
                      disabled={!this.state.manualmaxtutor}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputWeeklyhourspertutor">
                      Wochenstunden pro Tutor -{" "}
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="maxTutorNumber"
                          onChange={() => {
                            this.setState((prevState) => ({
                              manualweekly: !prevState.manualweekly,
                            }));
                          }}
                          value={this.state.manualweekly}
                        />
                        <label className="form-check-label" htmlFor="wacom">
                          Manuelle Eingabe
                        </label>
                      </div>
                    </label>
                    <TextFieldGroup
                      placeholder="Wochenstunden pro Tutor"
                      onChange={this.onChange}
                      value={this.state.weeklyhourspertutor}
                      name="weeklyhourspertutor"
                      error={errors.weeklyhourspertutor}
                      disabled={!this.state.manualweekly}
                    />
                  </div>
                </div>
                <div className="form-row">
                  {" "}
                  <div className="form-group col-md-6">
                    <label htmlFor="inputOverallhours">Wochen</label>
                    <TextFieldGroup
                      placeholder="Wochen"
                      onChange={this.onChange}
                      value={this.state.weeks}
                      name="weeks"
                      error={errors.weeks}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputOverallWeeklyhours">
                      Gesamtwochenstunden
                    </label>
                    <TextFieldGroup
                      placeholder="Overall Weekly Hours"
                      onChange={this.onChange}
                      value={this.state.overallweeklyhours}
                      name="overallweeklyhours"
                      error={errors.overallweeklyhours}
                      disabled={true}
                    />
                  </div>
                </div>
                <label htmlFor="inputOverallhours">Gesamtstunden</label>
                <TextFieldGroup
                  placeholder="Overall Hours"
                  onChange={this.onChange}
                  value={this.state.overallhours}
                  name="overallhours"
                  error={errors.overallhours}
                  disabled={true}
                />

                <label htmlFor="inputFrom">Von</label>
                <TextFieldGroup
                  type={"Date"}
                  placeholder="From"
                  onChange={this.onChange}
                  value={this.state.from}
                  name="from"
                  error={errors.from}
                />
                <label htmlFor="inputTill">Bis</label>
                <TextFieldGroup
                  type={"Date"}
                  placeholder="Till"
                  onChange={this.onChange}
                  value={this.state.till}
                  name="till"
                  error={errors.till}
                />
                <label htmlFor="inputRequirements">Anforderungen</label>
                <TextFieldGroup
                  placeholder="Anforderungen"
                  onChange={this.onChange}
                  value={this.state.requirement}
                  name="requirement"
                  error={errors.requirement}
                />
                <label htmlFor="inputAdvisor">Übungsleiter</label>
                <SelectListGroup
                  placeholder="Advisor"
                  onChange={this.onChange}
                  value={this.state.advisor}
                  name="advisor"
                  error={errors.advisor}
                  options={advisorOptions}
                />
                <label htmlFor="inputAdvisor">Übungsleiter 2</label>
                <SelectListGroup
                  placeholder="Advisor2"
                  onChange={this.onChange}
                  value={this.state.advisor2}
                  name="advisor2"
                  error={errors.advisor2}
                  options={advisorOptions}
                />
                <label htmlFor="inputAdvisor">Übungsleiter 3</label>
                <SelectListGroup
                  placeholder="Advisor3"
                  onChange={this.onChange}
                  value={this.state.advisor3}
                  name="advisor3"
                  error={errors.advisor3}
                  options={advisorOptions}
                />

                <label htmlFor="inputBetreuer">Betreuer</label>
                <SelectListGroup
                  placeholder="Betreuer"
                  onChange={this.onChange}
                  value={this.state.admin}
                  name="admin"
                  error={errors.admin}
                  options={adminOptions}
                />

                <label htmlFor="inputStatus">Status</label>
                <SelectListGroup
                  placeholder="Status"
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

CreateCourse.propTypes = (state) => ({
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
  createCourse,
  getSemesters,
  getMetacourses,
  getAdvisors,
  getAdmins,
})(withRouter(CreateCourse));
