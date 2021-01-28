import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

import {
  editMetacourse,
  getMetacourseById,
} from "../../actions/metacourseActions";

import isEmpty from "../../validation/is-empty";

class EditMetacourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      scheme: "",
      fondsnumber: "",
      costcentre: "",
      abbreviation: "",
      module: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getMetacourseById(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.metacourse) {
      const { metacourse } = nextProps.metacourse;

      //If metacourse field does not exist make empty string
      metacourse.name = !isEmpty(metacourse.name) ? metacourse.name : "";
      metacourse.scheme = !isEmpty(metacourse.scheme) ? metacourse.scheme : "";
      metacourse.fondsnumber = !isEmpty(metacourse.fondsnumber)
        ? metacourse.fondsnumber
        : "";
      metacourse.costcentre = !isEmpty(metacourse.costcentre)
        ? metacourse.costcentre
        : "";
      metacourse.abbreviation = !isEmpty(metacourse.abbreviation)
        ? metacourse.abbreviation
        : "";
      metacourse.module = !isEmpty(metacourse.module) ? metacourse.module : "";

      this.setState({
        name: metacourse.name,
        scheme: metacourse.scheme,
        fondsnumber: metacourse.fondsnumber,
        costcentre: metacourse.costcentre,
        abbreviation: metacourse.abbreviation,
        module: metacourse.module,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const metacourseData = {
      name: this.state.name,
      scheme: this.state.scheme,
      fondsnumber: this.state.fondsnumber,
      costcentre: this.state.costcentre,
      abbreviation: this.state.abbreviation,
      module: this.state.module,
    };

    this.props.editMetacourse(
      this.props.match.params.id,
      metacourseData,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const SchemaOptions = [
      { label: "* Schema", value: "" },
      { label: "Tutorien", value: "Tutorien" },
      { label: "Vorkurse", value: "Vorkurse" },
      { label: "Repetitorien", value: "Repetitorien" },
      { label: "Programmierprojekte", value: "Programmierprojekte" },
    ];

    return (
      <div className="editMetacourse">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/metacourse-overview"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Metakurs Bearbeiten</h1>
              <small className="d-block pb-3">* = benötigte Felder</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Bezeichnung Metakurs"
                  onChange={this.onChange}
                  value={this.state.name}
                  name="name"
                  error={errors.name}
                  info="* Bezeichnung Metakurs"
                />
                <SelectListGroup
                  placeholder="* Schema"
                  onChange={this.onChange}
                  value={this.state.scheme}
                  name="scheme"
                  error={errors.scheme}
                  options={SchemaOptions}
                  info="* Schema"
                />
                <TextFieldGroup
                  placeholder="* Fondsnummer"
                  onChange={this.onChange}
                  value={this.state.fondsnumber}
                  name="fondsnumber"
                  error={errors.fondsnumber}
                  info="* Fondsnummer"
                />
                <TextFieldGroup
                  placeholder="Kostenstelle"
                  onChange={this.onChange}
                  value={this.state.costcentre}
                  name="costcentre"
                  error={errors.costcentre}
                  info="Kostenstelle"
                />
                <TextFieldGroup
                  placeholder="* Abkürzung"
                  onChange={this.onChange}
                  value={this.state.abbreviation}
                  name="abbreviation"
                  error={errors.abbreviation}
                  info="* Abkürzung"
                />
                <TextFieldGroup
                  placeholder="Modul"
                  onChange={this.onChange}
                  value={this.state.module}
                  name="module"
                  error={errors.module}
                  info="Modul"
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

EditMetacourse.propTypes = (state) => ({
  metacourse: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  metacourse: state.metacourse,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { editMetacourse, getMetacourseById })(
  withRouter(EditMetacourse)
);
