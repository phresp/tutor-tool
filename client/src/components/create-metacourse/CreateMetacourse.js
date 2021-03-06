import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

import { createMetacourse } from "../../actions/metacourseActions";

class CreateMetacourse extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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

    this.props.createMetacourse(metacourseData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const MaßnahmeOptions = [
      { label: "* Maßnahme", value: "" },
      { label: "Tutorien", value: "Tutorien" },
      { label: "Vorkurse", value: "Vorkurse" },
      { label: "Repetitorien", value: "Repetitorien" },
      { label: "Programmierprojekte", value: "Programmierprojekte" },
    ];

    return (
      <div className="createMetacourse">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/metacourse-overview"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">
                Metaveranstaltung Erstellen
              </h1>
              <small className="d-block pb-3">* = benötigte Felder</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Bezeichnung Metaveranstaltung"
                  onChange={this.onChange}
                  value={this.state.name}
                  name="name"
                  error={errors.name}
                  info="* Bezeichnung Metaveranstaltung"
                />
                <SelectListGroup
                  placeholder="* Maßnahme"
                  onChange={this.onChange}
                  value={this.state.scheme}
                  name="scheme"
                  error={errors.scheme}
                  options={MaßnahmeOptions}
                  info="* Maßnahme"
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

CreateMetacourse.propTypes = (state) => ({
  semester: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  semester: state.semester,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { createMetacourse })(
  withRouter(CreateMetacourse)
);
