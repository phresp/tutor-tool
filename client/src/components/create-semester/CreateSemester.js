import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";

import { createSemester } from "../../actions/semesterActions";

class CreateSemester extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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

    this.props.createSemester(semesterData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="createSemester">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/semester-overview"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Semester Creation</h1>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Descriprion"
                  onChange={this.onChange}
                  value={this.state.name}
                  name="name"
                  error={errors.name}
                  info="Semester Description"
                />
                <TextFieldGroup
                  type={"date"}
                  placeholder="* From"
                  onChange={this.onChange}
                  value={this.state.from}
                  name="from"
                  error={errors.from}
                  info="Semester Start"
                />
                <TextFieldGroup
                  type={"date"}
                  placeholder="* Till"
                  onChange={this.onChange}
                  value={this.state.to}
                  name="to"
                  error={errors.to}
                  info="Semester Till"
                />
                <TextFieldGroup
                  type={"date"}
                  placeholder="* Courses From"
                  onChange={this.onChange}
                  value={this.state.coursefrom}
                  name="coursefrom"
                  error={errors.coursefrom}
                  info="Semester Courses Start"
                />
                <TextFieldGroup
                  type={"date"}
                  placeholder="* Courses Till"
                  onChange={this.onChange}
                  value={this.state.courseto}
                  name="courseto"
                  error={errors.courseto}
                  info="Semester Courses Till"
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

CreateSemester.propTypes = (state) => ({
  semester: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  semester: state.semester,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { createSemester })(
  withRouter(CreateSemester)
);
