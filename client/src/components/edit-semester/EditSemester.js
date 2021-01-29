import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import moment from "moment";

import { editSemester, getSemesterById } from "../../actions/semesterActions";
import isEmpty from "../../validation/is-empty";

class EditSemester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      from: "",
      to: "",
      coursefrom: "",
      courseto: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getSemesterById(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.semester) {
      const semester = nextProps.semester.semester;

      //If semester field does not exist make empty string
      semester.name = !isEmpty(semester.name) ? semester.name : "";
      semester.from = !isEmpty(semester.from) ? semester.from : "";
      semester.to = !isEmpty(semester.to) ? semester.to : "";
      semester.coursefrom = !isEmpty(semester.coursefrom)
        ? semester.coursefrom
        : "";
      semester.courseto = !isEmpty(semester.courseto) ? semester.courseto : "";

      this.setState({
        name: semester.name,
        from: semester.from,
        to: semester.to,
        coursefrom: semester.coursefrom,
        courseto: semester.courseto,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const semesterData = {
      name: this.state.name,
      from: this.state.from,
      to: this.state.to,
      coursefrom: this.state.coursefrom,
      courseto: this.state.courseto,
    };

    this.props.editSemester(
      this.props.match.params.id,
      semesterData,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="editSemester">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/semester-overview"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Semester Bearbeiten</h1>
              <small className="d-block pb-3">* = benötigte Felder</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Semester Bezeichnung"
                  onChange={this.onChange}
                  value={this.state.name}
                  name="name"
                  error={errors.name}
                  info="* Semester Bezeichnung"
                />
                <TextFieldGroup
                  type={"date"}
                  placeholder="* Semester Start"
                  onChange={this.onChange}
                  value={moment.utc(this.state.from).format("YYYY-MM-DD")}
                  name="from"
                  error={errors.from}
                  info="* Semester Start"
                />
                <TextFieldGroup
                  type={"date"}
                  placeholder="* Semester Ende"
                  onChange={this.onChange}
                  value={moment.utc(this.state.to).format("YYYY-MM-DD")}
                  name="to"
                  error={errors.to}
                  info="* Semester Ende"
                />
                <TextFieldGroup
                  type={"date"}
                  placeholder="* Kurse von"
                  onChange={this.onChange}
                  value={moment.utc(this.state.coursefrom).format("YYYY-MM-DD")}
                  name="coursefrom"
                  error={errors.coursefrom}
                  info="* Semester Kurse Start"
                />
                <TextFieldGroup
                  type={"date"}
                  placeholder="* Kurse bis"
                  onChange={this.onChange}
                  value={moment.utc(this.state.courseto).format("YYYY-MM-DD")}
                  name="courseto"
                  error={errors.courseto}
                  info="* Semester Kurse Ende"
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

EditSemester.propTypes = (state) => ({
  semester: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  semester: state.semester,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { editSemester, getSemesterById })(
  withRouter(EditSemester)
);
