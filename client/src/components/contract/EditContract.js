import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import ContractSelectListGroup from "../common/ContractSelectListGroup";
import SelectListGroup from "../common/SelectListGroup";
import moment from "moment";

import { getContractOfID, updateContract } from "../../actions/contractActions";

import isEmpty from "../../validation/is-empty";

class EditContract extends Component {
  componentDidMount() {
    this.props.getContractOfID(this.props.match.params.id);
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
      merkblatt: "",
      einstellungsvorschlag: "",
      versicherungspflicht: "",
      scientology: "",
      verfassungstreue: "",
      immatrikulationsbescheinigung: "",
      aufenthaltstitel: "",
      krankenkassenbescheinigung: "",
      personalbogenbezuegestelle: "",
      personalbogenstudierende: "",
      steuerId: "",
      status: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.contract.contract) {
      const contract = nextProps.contract.contract;

      //If profile field doesn't exist, make empty string
      contract.user = !isEmpty(contract.user) ? contract.user : "";
      contract.profile = !isEmpty(contract.profile) ? contract.profile : "";
      contract.course = !isEmpty(contract.course) ? contract.course : "";
      contract.contractID = !isEmpty(contract.contractID)
        ? contract.contractID
        : "";
      contract.contractstart = !isEmpty(contract.contractstart)
        ? contract.contractstart
        : "";
      contract.contractend = !isEmpty(contract.contractend)
        ? contract.contractend
        : "";
      contract.hours = !isEmpty(contract.hours) ? contract.hours : "";
      contract.degree = !isEmpty(contract.degree) ? contract.degree : "";
      contract.newcontract = !isEmpty(contract.newcontract)
        ? contract.newcontract
        : "";
      contract.merkblatt = !isEmpty(contract.merkblatt)
        ? contract.merkblatt
        : "";
      contract.einstellungsvorschlag = !isEmpty(contract.einstellungsvorschlag)
        ? contract.einstellungsvorschlag
        : "";
      contract.versicherungspflicht = !isEmpty(contract.versicherungspflicht)
        ? contract.versicherungspflicht
        : "";
      contract.scientology = !isEmpty(contract.scientology)
        ? contract.scientology
        : "";
      contract.verfassungstreue = !isEmpty(contract.verfassungstreue)
        ? contract.verfassungstreue
        : "";
      contract.immatrikulationsbescheinigung = !isEmpty(
        contract.immatrikulationsbescheinigung
      )
        ? contract.immatrikulationsbescheinigung
        : "";
      contract.aufenthaltstitel = !isEmpty(contract.aufenthaltstitel)
        ? contract.aufenthaltstitel
        : "";
      contract.krankenkassenbescheinigung = !isEmpty(
        contract.krankenkassenbescheinigung
      )
        ? contract.krankenkassenbescheinigung
        : "";
      contract.personalbogenbezuegestelle = !isEmpty(
        contract.personalbogenbezuegestelle
      )
        ? contract.personalbogenbezuegestelle
        : "";
      contract.personalbogenstudierende = !isEmpty(
        contract.personalbogenstudierende
      )
        ? contract.personalbogenstudierende
        : "";
      contract.sozialversicherungsausweis = !isEmpty(
        contract.sozialversicherungsausweis
      )
        ? contract.sozialversicherungsausweis
        : "";
      contract.steuerId = !isEmpty(contract.steuerId) ? contract.steuerId : "";
      contract.status = !isEmpty(contract.status) ? contract.status : "";

      //set component State Field
      this.setState({
        user: contract.user,
        profile: contract.profile,
        course: contract.course,
        applicationID: contract.applicationID,
        contractstart: contract.contractstart,
        contractend: contract.contractend,
        hours: contract.hours,
        degree: contract.degree,
        newcontract: contract.newcontract,
        merkblatt: contract.merkblatt,
        einstellungsvorschlag: contract.einstellungsvorschlag,
        versicherungspflicht: contract.versicherungspflicht,
        scientology: contract.scientology,
        verfassungstreue: contract.verfassungstreue,
        immatrikulationsbescheinigung: contract.immatrikulationsbescheinigung,
        aufenthaltstitel: contract.aufenthaltstitel,
        krankenkassenbescheinigung: contract.krankenkassenbescheinigung,
        personalbogenbezuegestelle: contract.personalbogenbezuegestelle,
        personalbogenstudierende: contract.personalbogenstudierende,
        sozialversicherungsausweis: contract.sozialversicherungsausweis,
        steuerId: contract.steuerId,
        status: contract.status,
      });
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
      sozialversicherungsausweis: this.state.sozialversicherungsausweis,
      steuerId: this.state.steuerId,
      status: this.state.status,
    };

    this.props.updateContract(
      this.props.match.params.id,
      contractData,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    //Name and course
    var contractname;
    if (this.props.contract.contract) {
      contractname =
        this.props.contract.contract.profile.firstname +
        " " +
        this.props.contract.contract.profile.lastname;
    }

    var check = (obj) => {
      if (obj != "Fehlt") {
        return <i className="fas fa-check"></i>;
      } else {
        return <i className=""></i>;
      }
    };

    //Select options for Forms
    const formsOptions = [
      { label: "Fehlt", value: "Fehlt" },
      { label: "Liegt vor", value: "Liegt vor" },
      { label: "Liegt bei", value: "Liegt bei" },
    ];

    //Select options for status of contract
    const statusOptions = [
      { label: "Created", value: "Created" },
      { label: "Incomplete", value: "Incomplete" },
      { label: "In Process", value: "In Process" },
      { label: "Signable", value: "Signable" },
      { label: "Completed", value: "Completed" },
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

    return (
      <div className="createContract">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/contracts"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">
                Contract of <br /> {contractname}
              </h1>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="contractstart">Contract Start:</label>
                <TextFieldGroup
                  type={"date"}
                  placeholder="Contract Start"
                  onChange={this.onChange}
                  value={moment
                    .utc(this.state.contractstart)
                    .format("YYYY-MM-DD")}
                  name="contractstart"
                  error={errors.contractstart}
                />
                <label htmlFor="contractend">Contract End:</label>
                <TextFieldGroup
                  type={"date"}
                  placeholder="Contract End"
                  onChange={this.onChange}
                  value={moment
                    .utc(this.state.contractend)
                    .format("YYYY-MM-DD")}
                  name="contractend"
                  error={errors.contractend}
                />
                <label htmlFor="hours">Hours:</label>
                <TextFieldGroup
                  placeholder="Hours"
                  onChange={this.onChange}
                  value={this.state.hours}
                  name="hours"
                  error={errors.hours}
                />
                <label htmlFor="degree">Degree:</label>
                <SelectListGroup
                  placeholder="Degree"
                  onChange={this.onChange}
                  value={this.state.degree}
                  name="degree"
                  error={errors.degree}
                  options={degreeOptions}
                />
                <label htmlFor="newContract">new Contract:</label>
                <SelectListGroup
                  placeholder="new Contract"
                  onChange={this.onChange}
                  value={this.state.newcontract}
                  name="newcontract"
                  error={errors.newcontract}
                  options={newcontractOptions}
                />

                <h6>Forms:</h6>
                <label htmlFor="merkblatt">Merkblatt:</label>
                <ContractSelectListGroup
                  placeholder="merkblatt"
                  onChange={this.onChange}
                  value={this.state.merkblatt}
                  name="merkblatt"
                  error={errors.merkblatt}
                  options={formsOptions}
                  color={this.state.merkblatt}
                />
                <label htmlFor="einstellungsvorschlag">
                  Einstellungsvorschlag:
                </label>
                <ContractSelectListGroup
                  placeholder="einstellungsvorschlag"
                  onChange={this.onChange}
                  value={this.state.einstellungsvorschlag}
                  name="einstellungsvorschlag"
                  error={errors.einstellungsvorschlag}
                  options={formsOptions}
                  color={this.state.einstellungsvorschlag}
                />
                <label htmlFor="versicherungspflicht">
                  Versicherungspflicht:
                </label>
                <ContractSelectListGroup
                  placeholder="versicherungspflicht"
                  onChange={this.onChange}
                  value={this.state.versicherungspflicht}
                  name="versicherungspflicht"
                  error={errors.versicherungspflicht}
                  options={formsOptions}
                  color={this.state.versicherungspflicht}
                />
                <label htmlFor="scientology">Scientology:</label>
                <ContractSelectListGroup
                  placeholder="scientology"
                  onChange={this.onChange}
                  value={this.state.scientology}
                  name="scientology"
                  error={errors.scientology}
                  options={formsOptions}
                  color={this.state.scientology}
                />
                <label htmlFor="verfassungstreue">Verfassungstreue:</label>
                <ContractSelectListGroup
                  placeholder="verfassungstreue"
                  onChange={this.onChange}
                  value={this.state.verfassungstreue}
                  name="verfassungstreue"
                  error={errors.verfassungstreue}
                  options={formsOptions}
                  color={this.state.verfassungstreue}
                />
                <label htmlFor="immatrikulationsbescheinigung">
                  Immatrikulationsbescheinigung:
                </label>
                <ContractSelectListGroup
                  placeholder="immatrikulationsbescheinigung"
                  onChange={this.onChange}
                  value={this.state.immatrikulationsbescheinigung}
                  name="immatrikulationsbescheinigung"
                  error={errors.immatrikulationsbescheinigung}
                  options={formsOptions}
                  color={this.state.immatrikulationsbescheinigung}
                />
                <label htmlFor="aufenthaltstitel">Aufenthaltstitel:</label>
                <ContractSelectListGroup
                  placeholder="aufenthaltstitel"
                  onChange={this.onChange}
                  value={this.state.aufenthaltstitel}
                  name="aufenthaltstitel"
                  error={errors.aufenthaltstitel}
                  options={formsOptions}
                  color={this.state.aufenthaltstitel}
                />
                <label htmlFor="krankenkassenbescheinigung">
                  Krankenkassenbescheinigung:
                </label>
                <ContractSelectListGroup
                  placeholder="krankenkassenbescheinigung"
                  onChange={this.onChange}
                  value={this.state.krankenkassenbescheinigung}
                  name="krankenkassenbescheinigung"
                  error={errors.krankenkassenbescheinigung}
                  options={formsOptions}
                  color={this.state.krankenkassenbescheinigung}
                />
                <label htmlFor="personalbogenbezuegestelle">
                  Personalbogen Bezügestelle:
                </label>
                <ContractSelectListGroup
                  placeholder="personalbogenbezuegestelle"
                  onChange={this.onChange}
                  value={this.state.personalbogenbezuegestelle}
                  name="personalbogenbezuegestelle"
                  error={errors.personalbogenbezuegestelle}
                  options={formsOptions}
                  color={this.state.personalbogenbezuegestelle}
                />
                <label htmlFor="personalbogenstudierende">
                  Personalbogen für Studierende:
                </label>
                <ContractSelectListGroup
                  placeholder="personalbogenstudierende"
                  onChange={this.onChange}
                  value={this.state.personalbogenstudierende}
                  name="personalbogenstudierende"
                  error={errors.personalbogenstudierende}
                  options={formsOptions}
                  color={this.state.personalbogenstudierende}
                />
                <label htmlFor="steuerId">SteuerId:</label>
                <ContractSelectListGroup
                  placeholder="steuerId"
                  onChange={this.onChange}
                  value={this.state.steuerId}
                  name="steuerId"
                  error={errors.steuerId}
                  options={formsOptions}
                  color={this.state.steuerId}
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

EditContract.propTypes = (state) => ({
  user: PropTypes.object.isRequired,
  constract: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  contract: state.contract,
  application: state.application,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getContractOfID,
  updateContract,
})(withRouter(EditContract));
