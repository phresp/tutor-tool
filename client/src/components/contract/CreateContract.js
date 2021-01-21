import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

import { createContract } from "../../actions/contractActions";

import { getApplicationOfId } from "../../actions/applicationActions";

import { isEmpty } from "../../validation/is-empty";

class CreateContract extends Component {
  componentDidMount() {
    this.props.getApplicationOfId(this.props.match.params.id);
  }

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      profile: "",
      course: "",
      applicationID: "",
      contractstart: "",
      contractend: "",
      hours: "",
      degree: "",
      newcontract: "",
      merkblatt: "Fehlt",
      einstellungsvorschlag: "Fehlt",
      versicherungspflicht: "Fehlt",
      scientology: "Fehlt",
      verfassungstreue: "Fehlt",
      immatrikulationsbescheinigung: "Fehlt",
      aufenthaltstitel: "Fehlt",
      krankenkassenbescheinigung: "Fehlt",
      personalbogenbezuegestelle: "Fehlt",
      personalbogenstudierende: "Fehlt",
      steuerId: "Fehlt",
      reisepass: "Fehlt",
      status: "Created",
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
    const contractData = {
      user: this.state.user,
      profile: this.state.profile,
      course: this.state.course,
      applicationID: this.state.applicationID,
      contractstart: this.state.contractstart,
      contractend: this.state.contractend,
      hours: this.state.hours,
      degree: this.state.degree,
      newcontract: this.state.newcontract,
      merkblatt: this.state.merkblatt,
      einstellungsvorschlag: this.state.einstellungsvorschlag,
      versicherungspflicht: this.state.versicherungspflicht,
      scientology: this.state.scientology,
      verfassungstreue: this.state.verfassungstreue,
      immatrikulationsbescheinigung: this.state.immatrikulationsbescheinigung,
      aufenthaltstitel: this.state.aufenthaltstitel,
      krankenkassenbescheinigung: this.state.krankenkassenbescheinigung,
      personalbogenbezuegestelle: this.state.personalbogenbezuegestelle,
      personalbogenstudierende: this.state.personalbogenstudierende,
      steuerId: this.state.steuerId,
      reisepass: this.state.reisepass,
      status: this.state.status,
    };

    this.props.createContract(contractData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    //Get User ID
    if (this.props.application.application) {
      this.state.user = this.props.application.application.user._id;
    }
    // Get profile ID
    if (this.props.application.application) {
      this.state.profile = this.props.application.application.profile._id;
    }

    //Get Profile ID
    if (this.props.application.application) {
      this.state.course = this.props.application.application.course._id;
    }

    //Get application ID
    if (this.props.application.application) {
      this.state.applicationID = this.props.application.application._id;
    }

    //Name and course
    var contractname;
    if (this.props.application.application) {
      contractname =
        this.props.application.application.profile.firstname +
        " " +
        this.props.application.application.profile.lastname;
    }

    //Select options for Forms
    const formsOptions = [
      { label: "Fehlt", value: "Fehlt" },
      { label: "Liegt vor", value: "Liegt vor" },
      { label: "Liegt bei", value: "Liegt bei" },
    ];

    //Options for forms that are not always needed
    const formsNotAlwaysNeededOptions = [
      { label: "Fehlt", value: "Fehlt" },
      { label: "Bereits Vorhanden", value: "Bereits Vorhanden" },
      { label: "Liegt vor", value: "Liegt vor" },
      { label: "Liegt bei", value: "Liegt bei" },
    ];

    //Select options for Reisepass and Aufenthaltstitel
    const foreignerOptions = [
      { label: "Kein Bedarf", value: "Kein Bedarf" },
      { label: "Fehlt", value: "Fehlt" },
      { label: "Liegt vor", value: "Liegt vor" },
      { label: "Liegt bei", value: "Liegt bei" },
    ];

    //Select options for status of contract
    const statusOptions = [
      { label: "Erstellt", value: "Created" },
      { label: "Unvollständig", value: "Incomplete" },
      { label: "In Bearbeitung", value: "In Process" },
      { label: "Unterschriftsbereit", value: "Signable" },
      { label: "Abgeschlossen", value: "Completed" },
    ];

    //Select options for Degree
    const degreeOptions = [
      { label: "None", value: "None" },
      { label: "Bachelor", value: "Bachelor" },
      { label: "Master", value: "Master" },
    ];

    //Select options for new Contract
    const newcontractOptions = [
      { label: "True", value: "True" },
      { label: "False", value: "False" },
    ];

    //Query to set forms we dont need if there is already an contract
    if (
      this.state.newcontract === "False" &&
      (this.state.merkblatt !== "Bereits Vorhanden" ||
        this.state.versicherungspflicht !== "Bereits Vorhanden" ||
        this.state.immatrikulationsbescheinigung !== "Bereits Vorhanden")
    ) {
      this.setState({
        merkblatt: "Bereits Vorhanden",
        versicherungspflicht: "Bereits Vorhanden",
        immatrikulationsbescheinigung: "Bereits Vorhanden",
      });
    }

    if (this.props.application.application) {
      if (this.props.application.application.profile) {
        if (
          this.props.application.application.profile.nationality === "DE" ||
          this.props.application.application.profile.nationality2 === "DE"
        ) {
          this.state.reisepass = "Kein Bedarf";
          this.state.aufenthaltstitel = "Kein Bedarf";
        }
      }
    }

    return (
      <div className="createContract">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/course-overview"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">
                Vertrag von <br /> {contractname}
              </h1>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="contractstart">Vertrag Start:</label>
                <TextFieldGroup
                  type={"date"}
                  placeholder="Contract Start"
                  onChange={this.onChange}
                  value={this.state.contractstart}
                  name="contractstart"
                  error={errors.contractstart}
                />
                <label htmlFor="contractend">Vertrag Ende:</label>
                <TextFieldGroup
                  type={"date"}
                  placeholder="Contract End"
                  onChange={this.onChange}
                  value={this.state.contractend}
                  name="contractend"
                  error={errors.contractend}
                />
                <label htmlFor="hours">Wochenstunden:</label>
                <TextFieldGroup
                  placeholder="Hours"
                  onChange={this.onChange}
                  value={this.state.hours}
                  name="hours"
                  error={errors.hours}
                />
                <label htmlFor="degree">Abschluss:</label>
                <SelectListGroup
                  placeholder="Degree"
                  onChange={this.onChange}
                  value={this.state.degree}
                  name="degree"
                  error={errors.degree}
                  options={degreeOptions}
                />
                <label htmlFor="newContract">neuer Vertrag:</label>
                <SelectListGroup
                  placeholder="new Contract"
                  onChange={this.onChange}
                  value={this.state.newcontract}
                  name="newcontract"
                  error={errors.newcontract}
                  options={newcontractOptions}
                />

                <h6>Formulare:</h6>
                <label htmlFor="merkblatt">Merkblatt:</label>
                <SelectListGroup
                  placeholder="merkblatt"
                  onChange={this.onChange}
                  value={this.state.merkblatt}
                  name="merkblatt"
                  error={errors.merkblatt}
                  options={formsNotAlwaysNeededOptions}
                />
                <label htmlFor="einstellungsvorschlag">
                  Einstellungsvorschlag:
                </label>
                <SelectListGroup
                  placeholder="einstellungsvorschlag"
                  onChange={this.onChange}
                  value={this.state.einstellungsvorschlag}
                  name="einstellungsvorschlag"
                  error={errors.einstellungsvorschlag}
                  options={formsOptions}
                />
                <label htmlFor="versicherungspflicht">
                  Versicherungspflicht:
                </label>
                <SelectListGroup
                  placeholder="versicherungspflicht"
                  onChange={this.onChange}
                  value={this.state.versicherungspflicht}
                  name="versicherungspflicht"
                  error={errors.versicherungspflicht}
                  options={formsNotAlwaysNeededOptions}
                />
                <label htmlFor="scientology">Scientology:</label>
                <SelectListGroup
                  placeholder="scientology"
                  onChange={this.onChange}
                  value={this.state.scientology}
                  name="scientology"
                  error={errors.scientology}
                  options={formsOptions}
                />
                <label htmlFor="verfassungstreue">Verfassungstreue:</label>
                <SelectListGroup
                  placeholder="verfassungstreue"
                  onChange={this.onChange}
                  value={this.state.verfassungstreue}
                  name="verfassungstreue"
                  error={errors.verfassungstreue}
                  options={formsOptions}
                />
                <label htmlFor="immatrikulationsbescheinigung">
                  Immatrikulationsbescheinigung:
                </label>
                <SelectListGroup
                  placeholder="immatrikulationsbescheinigung"
                  onChange={this.onChange}
                  value={this.state.immatrikulationsbescheinigung}
                  name="immatrikulationsbescheinigung"
                  error={errors.immatrikulationsbescheinigung}
                  options={formsNotAlwaysNeededOptions}
                />
                <label htmlFor="aufenthaltstitel">Aufenthaltstitel:</label>
                <SelectListGroup
                  placeholder="aufenthaltstitel"
                  onChange={this.onChange}
                  value={this.state.aufenthaltstitel}
                  name="aufenthaltstitel"
                  error={errors.aufenthaltstitel}
                  options={foreignerOptions}
                />
                <label htmlFor="krankenkassenbescheinigung">
                  Krankenkassenbescheinigung:
                </label>
                <SelectListGroup
                  placeholder="krankenkassenbescheinigung"
                  onChange={this.onChange}
                  value={this.state.krankenkassenbescheinigung}
                  name="krankenkassenbescheinigung"
                  error={errors.krankenkassenbescheinigung}
                  options={formsOptions}
                />
                <label htmlFor="personalbogenbezuegestelle">
                  Personalbogen Bezügestelle:
                </label>
                <SelectListGroup
                  placeholder="personalbogenbezuegestelle"
                  onChange={this.onChange}
                  value={this.state.personalbogenbezuegestelle}
                  name="personalbogenbezuegestelle"
                  error={errors.personalbogenbezuegestelle}
                  options={formsOptions}
                />
                <label htmlFor="personalbogenstudierende">
                  Personalbogen für Studierende:
                </label>
                <SelectListGroup
                  placeholder="personalbogenstudierende"
                  onChange={this.onChange}
                  value={this.state.personalbogenstudierende}
                  name="personalbogenstudierende"
                  error={errors.personalbogenstudierende}
                  options={formsOptions}
                />
                <label htmlFor="steuerId">SteuerId:</label>
                <SelectListGroup
                  placeholder="steuerId"
                  onChange={this.onChange}
                  value={this.state.steuerId}
                  name="steuerId"
                  error={errors.steuerId}
                  options={formsOptions}
                />

                <label htmlFor="reisepass">Reisepass:</label>
                <SelectListGroup
                  placeholder="reisepass"
                  onChange={this.onChange}
                  value={this.state.reisepass}
                  name="reisepass"
                  error={errors.reisepass}
                  options={foreignerOptions}
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

CreateContract.propTypes = (state) => ({
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  application: state.application,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  createContract,
  getApplicationOfId,
})(withRouter(CreateContract));
