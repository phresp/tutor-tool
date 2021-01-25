import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

import { createContract } from "../../actions/contractActions";

import { getApplicationOfId } from "../../actions/applicationActions";

import verfassungsPruefung from "../common/VerfassungschutzCountries";

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
      contractstart2: "",
      contractend2: "",
      hours2: "",
      contractstart3: "",
      contractend3: "",
      hours3: "",
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
      stipendium: "Fehlt",
      status: "Created",
      displayContractsplitting: false,
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
      contractstart2: this.state.contractstart2,
      contractend2: this.state.contractend2,
      hours2: this.state.hours2,
      contractstart3: this.state.contractstart3,
      contractend3: this.state.contractend3,
      hours3: this.state.hours3,
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
      stipendium: this.state.stipendium,
      status: this.state.status,
    };

    this.props.createContract(contractData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displayContractsplitting } = this.state;

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

    if (this.props.application.application) {
      if (this.props.application.application.profile) {
        if (!this.props.application.application.profile.stipendiumend) {
          this.state.stipendium = "Kein Bedarf";
        }
      }
    }

    var verfassungsPruefungTooltip = <div></div>;

    if (this.props.application.application) {
      if (this.props.application.application.profile) {
        if (
          verfassungsPruefung.indexOf(
            this.props.application.application.profile.countryofbirth
          ) !== -1
        ) {
          verfassungsPruefungTooltip = (
            <h3 className="text-danger">Verfassungsprüfung nötig!</h3>
          );
        } else if (
          verfassungsPruefung.indexOf(
            this.props.application.application.profile.nationality
          ) !== -1
        ) {
          verfassungsPruefungTooltip = (
            <h3 className="text-danger">Verfassungsprüfung nötig!</h3>
          );
        } else if (
          verfassungsPruefung.indexOf(
            this.props.application.application.profile.nationality2
          ) !== -1
        ) {
          verfassungsPruefungTooltip = (
            <h3 className="text-danger">Verfassungsprüfung nötig!</h3>
          );
        } else {
          verfassungsPruefungTooltip = <div></div>;
        }
      }
    }

    var vertragSplitting;

    if (displayContractsplitting) {
      vertragSplitting = (
        <div className="bg-light">
          <hr />
          <label htmlFor="contractstart">Vertrag Start 2:</label>
          <TextFieldGroup
            type={"date"}
            placeholder="Contract Start"
            onChange={this.onChange}
            value={this.state.contractstart2}
            name="contractstart2"
            error={errors.contractstart2}
          />
          <label htmlFor="contractend">Vertrag Ende 2:</label>
          <TextFieldGroup
            type={"date"}
            placeholder="Contract End"
            onChange={this.onChange}
            value={this.state.contractend2}
            name="contractend2"
            error={errors.contractend2}
          />
          <label htmlFor="hours">Wochenstunden 2:</label>
          <TextFieldGroup
            placeholder="Wochenstunden 2"
            onChange={this.onChange}
            value={this.state.hours2}
            name="hours2"
            error={errors.hours2}
          />

          <label htmlFor="contractstart">Vertrag Start 3:</label>
          <TextFieldGroup
            type={"date"}
            placeholder="Contract Start"
            onChange={this.onChange}
            value={this.state.contractstart3}
            name="contractstart3"
            error={errors.contractstart3}
          />
          <label htmlFor="contractend">Vertrag Ende 3:</label>
          <TextFieldGroup
            type={"date"}
            placeholder="Contract End 3"
            onChange={this.onChange}
            value={this.state.contractend3}
            name="contractend3"
            error={errors.contractend3}
          />
          <label htmlFor="hours">Wochenstunden 3:</label>
          <TextFieldGroup
            placeholder="Wochenstunden 3"
            onChange={this.onChange}
            value={this.state.hours3}
            name="hours3"
            error={errors.hours3}
          />
          <hr />
        </div>
      );
    }

    //Buttoncolor for Contractsplitting
    var color;

    if (displayContractsplitting) {
      color = "btn btn-success";
    } else {
      color = "btn btn-light";
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
              {verfassungsPruefungTooltip}
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
                  placeholder="Wochenstunden"
                  onChange={this.onChange}
                  value={this.state.hours}
                  name="hours"
                  error={errors.hours}
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displayContractsplitting: !prevState.displayContractsplitting,
                      }));
                    }}
                    className={color}
                  >
                    Vertragsplitting
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {vertragSplitting}
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

                <label htmlFor="aufenthaltstitel">Aufenthaltstitel:</label>
                <SelectListGroup
                  placeholder="aufenthaltstitel"
                  onChange={this.onChange}
                  value={this.state.aufenthaltstitel}
                  name="aufenthaltstitel"
                  error={errors.aufenthaltstitel}
                  options={foreignerOptions}
                />

                <label htmlFor="stipendium">Stipendiumsbescheinigung:</label>
                <SelectListGroup
                  placeholder="stipendium"
                  onChange={this.onChange}
                  value={this.state.stipendium}
                  name="stipendium"
                  error={errors.stipendium}
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
