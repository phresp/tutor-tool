import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import ContractSelectListGroup from "../common/ContractSelectListGroup";
import SelectListGroup from "../common/SelectListGroup";
import moment from "moment";
import countryList from "react-select-country-list";

import {
  getContractOfID,
  updateContract,
  getContractsForContract,
} from "../../actions/contractActions";
import { downloadEV } from "../../actions/formsActions";
import { getAdvisors, getAdmins } from "../../actions/profileActions";

import isEmpty from "../../validation/is-empty";
import verfassungsPruefung from "../common/VerfassungschutzCountries";

class EditContract extends Component {
  componentDidMount() {
    this.props.getContractOfID(this.props.match.params.id);
    this.props.getContractsForContract(this.props.match.params.id);
    this.props.getAdvisors();
    this.props.getAdmins();
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
      profiledegree: "",
      newcontract: "",
      merkblatt: "",
      einstellungsvorschlag: "",
      versicherungspflicht: "",
      scientology: "",
      verfassungstreue: "",
      immatrikulationsbescheinigung: "",
      aufenthaltstitel: "",
      reisepass: "",
      krankenkassenbescheinigung: "",
      personalbogenbezuegestelle: "",
      personalbogenstudierende: "",
      steuerId: "",
      stipendium: "",
      abschlusszeugnis: "",
      status: "",
      admin: "",
      advisor: "",
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

    if (nextProps.contract.contract) {
      const contract = nextProps.contract.contract;
      var display = false;

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

      contract.contractstart2 = !isEmpty(contract.contractstart2)
        ? contract.contractstart2
        : "";
      contract.contractend2 = !isEmpty(contract.contractend2)
        ? contract.contractend2
        : "";
      contract.hours2 = !isEmpty(contract.hours2) ? contract.hours2 : "";

      contract.contractstart3 = !isEmpty(contract.contractstart3)
        ? contract.contractstart3
        : "";
      contract.contractend3 = !isEmpty(contract.contractend3)
        ? contract.contractend3
        : "";
      contract.hours3 = !isEmpty(contract.hours3) ? contract.hours3 : "";

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
      contract.stipendium = !isEmpty(contract.stipendium)
        ? contract.stipendium
        : "";
      contract.abschlusszeugnis = !isEmpty(contract.abschlusszeugnis)
        ? contract.abschlusszeugnis
        : "";
      contract.reisepass = !isEmpty(contract.reisepass)
        ? contract.reisepass
        : "";
      contract.status = !isEmpty(contract.status) ? contract.status : "";
      if (contract.profile.degree) {
        contract.profiledegree = !isEmpty(contract.profile.degree)
          ? contract.profile.degree
          : "";
      }
      if (
        contract.contractstart2 ||
        contract.contractstart3 ||
        contract.contractend2 ||
        contract.contractend3 ||
        contract.hours2 ||
        contract.hours3
      ) {
        display = true;
      }
      //set component State Field
      this.setState({
        user: contract.user,
        profile: contract.profile,
        course: contract.course,
        applicationID: contract.applicationID,
        contractstart: contract.contractstart,
        contractend: contract.contractend,
        hours: contract.hours,
        contractstart2: contract.contractstart2,
        contractend2: contract.contractend2,
        hours2: contract.hours2,
        contractstart3: contract.contractstart3,
        contractend3: contract.contractend3,
        hours3: contract.hours3,
        degree: contract.degree,
        profiledegree: contract.profiledegree,
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
        reisepass: contract.reisepass,
        stipendium: contract.stipendium,
        abschlusszeugnis: contract.abschlusszeugnis,
        status: contract.status,
        displayContractsplitting: display,
      });
    }

    //Get Advisordata for EV
    if (nextProps.profile.advisors) {
      const advisors = nextProps.profile.advisors;
      var advisor;
      if (this.props.contract) {
        if (this.props.contract.contract) {
          if (this.props.contract.contract.course) {
            advisor = advisors.find(
              (el) =>
                el.user._id === this.props.contract.contract.course.advisor
            );
          }
        }
      }
      if (advisor) {
        this.setState({
          advisorlastname: advisor.lastname,
          advisorfirstname: advisor.firstname,
        });
      }
    }

    //Get Admindata for EV
    if (nextProps.profile.admins) {
      const admins = nextProps.profile.admins;
      var admin;
      if (this.props.contract) {
        if (this.props.contract.contract) {
          if (this.props.contract.contract.course) {
            admin = admins.find(
              (el) => el.user._id === this.props.contract.contract.course.admin
            );
          }
        }
      }
      if (admin) {
        this.setState({
          adminlastname: admin.lastname,
          adminfirstname: admin.firstname,
        });
      }
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
      reisepass: this.state.reisepass,
      stipendium: this.state.stipendium,
      abschlusszeugnis: this.state.abschlusszeugnis,
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

  onDownloadClick(e) {
    e.preventDefault();
    var nat = countryList().getLabel(
      this.props.contract.contract.profile.nationality
    );
    var cob = countryList().getLabel(
      this.props.contract.contract.profile.countryofbirth
    );
    const evData = {
      name: "Einstellungsvorschlag",
      lastname: this.props.contract.contract.profile.lastname,
      firstname: this.props.contract.contract.profile.firstname,
      advisorlastname: this.state.advisorlastname,
      advisorfirstname: this.state.advisorfirstname,
      adminlastname: this.state.adminlastname,
      adminfirstname: this.state.adminfirstname,
      nationality: nat,
      birthplace: this.props.contract.contract.profile.birthplace,
      countryofbirth: cob,
      birthday: this.props.contract.contract.profile.birthday,
      contractstart: this.state.contractstart,
      contractend: this.state.contractend,
      contractstart2: this.state.contractstart2,
      contractend2: this.state.contractend2,
      contractstart3: this.state.contractstart3,
      contractend3: this.state.contractend3,
      degree: this.state.degree,
      hours: this.state.hours,
      hours2: this.state.hours2,
      hours3: this.state.hours3,
      courseabb: this.props.contract.contract.course.metacourse.abbreviation,
      module: this.props.contract.contract.course.metacourse.module,
      scheme: this.props.contract.contract.course.metacourse.scheme,
      fondsnumber: this.props.contract.contract.course.metacourse.fondsnumber,
      costcentre: this.props.contract.contract.course.metacourse.costcentre,
      merkblatt: this.state.merkblatt,
      einstellungsvorschlag: this.state.einstellungsvorschlag,
      versicherungspflicht: this.state.versicherungspflicht,
      scientology: this.state.scientology,
      verfassungstreue: this.state.verfassungstreue,
      immatrikulationsbescheinigung: this.state.immatrikulationsbescheinigung,
      aufenthaltstitel: this.state.aufenthaltstitel,
      reisepass: this.state.reisepass,
      stipendium: this.state.stipendium,
      krankenkassenbescheinigung: this.state.krankenkassenbescheinigung,
      personalbogenbezuegestelle: this.state.personalbogenbezuegestelle,
      personalbogenstudierende: this.state.personalbogenstudierende,
      sozialversicherungsausweis: this.state.sozialversicherungsausweis,
      steuerId: this.state.steuerId,
    };
    this.props.downloadEV(evData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displayContractsplitting } = this.state;

    //Name and course
    var contractname;
    if (this.props.contract.contract) {
      contractname =
        this.props.contract.contract.profile.firstname +
        " " +
        this.props.contract.contract.profile.lastname;
    }

    var contractcourse;
    if (this.props.contract.contract) {
      contractcourse = this.props.contract.contract.course.metacourse.name;
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

    //Select options for degree
    const degreeOptions = [
      { label: "None", value: "" },
      { label: "Bachelor(FH,Uni)/Diplom(FH)/Master(FH)", value: "Bachelor" },
      { label: "Master(Uni)", value: "Master" },
      { label: "Diplom(Uni)", value: "Diplom" },
    ];

    //Select options for new Contract
    const newcontractOptions = [
      { label: "Neueinstellung", value: "True" },
      { label: "Weiterbeschäftigung", value: "False" },
    ];

    //Query to set forms we dont need if there is already an contract
    if (
      this.state.newcontract === "False" &&
      (this.state.scientology !== "Liegt vor" ||
        this.state.verfassungstreue !== "Liegt vor" ||
        this.state.krankenkassenbescheinigung !== "Liegt vor" ||
        this.state.personalbogenstudierende !== "Liegt vor" ||
        this.state.steuerId !== "Liegt vor")
    ) {
      this.setState({
        scientology: "Liegt vor",
        verfassungstreue: "Liegt vor",
        krankenkassenbescheinigung: "Liegt vor",
        personalbogenstudierende: "Liegt vor",
        steuerId: "Liegt vor",
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

    var verfassungsPruefungTooltip = <div></div>;

    if (this.props.contract.contract) {
      if (this.props.contract.contract.profile) {
        if (
          verfassungsPruefung.indexOf(
            this.props.contract.contract.profile.countryofbirth
          ) !== -1
        ) {
          verfassungsPruefungTooltip = (
            <h3 className="text-danger">Verfassungsprüfung nötig!</h3>
          );
        } else if (
          verfassungsPruefung.indexOf(
            this.props.contract.contract.profile.nationality
          ) !== -1
        ) {
          verfassungsPruefungTooltip = (
            <h3 className="text-danger">Verfassungsprüfung nötig!</h3>
          );
        } else if (
          verfassungsPruefung.indexOf(
            this.props.contract.contract.profile.nationality2
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

    var degreeTooltipp = <div></div>;

    if (
      this.state.profiledegree &&
      this.state.profiledegree != this.state.degree
    ) {
      degreeTooltipp = (
        <h3 className="text-danger">
          Abschluss anders als von Tutor angegeben!
        </h3>
      );
    }

    //20 Hour Max Calculations Date 1
    const contracts = this.props.application.applications;
    var hoursum = this.state.hours;
    var hoursummessage = <div></div>;
    if (contracts) {
      contracts.forEach((element) => {
        const overlap = Math.max(
          0,
          Math.min.apply(null, [
            new Date(this.state.contractend),
            new Date(element.contractend),
          ]) -
            Math.max.apply(null, [
              new Date(this.state.contractstart),
              new Date(element.contractstart),
            ])
        );
        if (overlap > 0) {
          hoursum = hoursum * 1 + element.hours;
        }
      });
      if (hoursum > 20) {
        hoursummessage = (
          <h3 className="text-danger">
            Achtung Wochenstunden zu hoch! ({hoursum})
          </h3>
        );
      }
    }

    //20 Hour Max Calculations Date 2
    var hoursum2 = this.state.hours2;
    var hoursum2message = <div></div>;
    if (contracts) {
      contracts.forEach((element) => {
        const overlap = Math.max(
          0,
          Math.min.apply(null, [
            new Date(this.state.contractend2),
            new Date(element.contractend),
          ]) -
            Math.max.apply(null, [
              new Date(this.state.contractstart2),
              new Date(element.contractstart),
            ])
        );
        if (overlap > 0) {
          hoursum2 = hoursum2 * 1 + element.hours;
        }
      });
      if (hoursum2 > 20) {
        hoursum2message = (
          <h3 className="text-danger">
            Achtung Wochenstunden zu hoch! ({hoursum2})
          </h3>
        );
      }
    }

    //20 Hour Max Calculations Date 3
    var hoursum3 = this.state.hours3;
    var hoursum3message = <div></div>;
    if (contracts) {
      contracts.forEach((element) => {
        const overlap = Math.max(
          0,
          Math.min.apply(null, [
            new Date(this.state.contractend3),
            new Date(element.contractend),
          ]) -
            Math.max.apply(null, [
              new Date(this.state.contractstart3),
              new Date(element.contractstart),
            ])
        );
        if (overlap > 0) {
          hoursum3 = hoursum3 * 1 + element.hours;
        }
      });
      if (hoursum3 > 20) {
        hoursum3message = (
          <h3 className="text-danger">
            Achtung Wochenstunden zu hoch! ({hoursum3})
          </h3>
        );
      }
    }

    var vertragSplitting;

    if (this.state.displayContractsplitting) {
      vertragSplitting = (
        <div className="bg-light">
          <hr />
          <label htmlFor="contractstart">Vertrag Start 2:</label>
          <TextFieldGroup
            type={"date"}
            placeholder="Contract Start"
            onChange={this.onChange}
            value={moment.utc(this.state.contractstart2).format("YYYY-MM-DD")}
            name="contractstart2"
            error={errors.contractstart2}
          />
          <label htmlFor="contractend">Vertrag Ende 2:</label>
          <TextFieldGroup
            type={"date"}
            placeholder="Contract End"
            onChange={this.onChange}
            value={moment.utc(this.state.contractend2).format("YYYY-MM-DD")}
            name="contractend2"
            error={errors.contractend2}
          />
          {hoursum2message}
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
            value={moment.utc(this.state.contractstart3).format("YYYY-MM-DD")}
            name="contractstart3"
            error={errors.contractstart3}
          />
          <label htmlFor="contractend">Vertrag Ende 3:</label>
          <TextFieldGroup
            type={"date"}
            placeholder="Contract End 3"
            onChange={this.onChange}
            value={moment.utc(this.state.contractend3).format("YYYY-MM-DD")}
            name="contractend3"
            error={errors.contractend3}
          />
          {hoursum3message}
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

    //TODO: Abgelaufene Daten Tooltipp
    var profile;
    var aufenthaltToolTipp;
    var stipendiumToolTipp;
    if (profile) {
      if (new Date(profile.aufenthaltend) < Date.now()) {
        aufenthaltToolTipp = (
          <h3 className="text-danger">Aufenthaltstitel abgelaufen!</h3>
        );
      }
    }

    if (profile) {
      if (
        new Date(profile.stipendiumend) < Date.now() &&
        profile.stipendiumend
      ) {
        stipendiumToolTipp = (
          <h3 className="text-danger">Stipendium abgelaufen!</h3>
        );
      }
    }

    //Weiterbeschäftigung possible
    var weiterbeschäftigungTooltipp;
    if (contracts) {
      var oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      contracts.forEach((element) => {
        if (
          new Date(element.contractend) > oneYearAgo ||
          new Date(element.contractend2) > oneYearAgo ||
          new Date(element.contractend3) > oneYearAgo
        ) {
          weiterbeschäftigungTooltipp = <h5>Weiterbeschäftigung möglich</h5>;
        }
      });
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
              <Link to={"/contracts"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">
                Vertrag von <br /> {contractname} <br /> für {contractcourse}
                {verfassungsPruefungTooltip}
              </h1>

              <button
                type="button"
                onClick={this.onDownloadClick.bind(this)}
                className="btn btn-primary"
              >
                EV exportieren
              </button>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="contractstart">Vertrag Start:</label>
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
                <label htmlFor="contractend">Vertrag Ende:</label>
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
                {hoursummessage}
                <label htmlFor="hours">Wochenstunden:</label>
                <TextFieldGroup
                  placeholder="Hours"
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
                {degreeTooltipp}
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
                {weiterbeschäftigungTooltipp}
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
                <ContractSelectListGroup
                  placeholder="merkblatt"
                  onChange={this.onChange}
                  value={this.state.merkblatt}
                  name="merkblatt"
                  error={errors.merkblatt}
                  options={formsNotAlwaysNeededOptions}
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
                  options={formsNotAlwaysNeededOptions}
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
                  options={formsNotAlwaysNeededOptions}
                  color={this.state.immatrikulationsbescheinigung}
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
                <label htmlFor="reisepass">Reisepass:</label>
                <ContractSelectListGroup
                  placeholder="reisepass"
                  onChange={this.onChange}
                  value={this.state.reisepass}
                  name="reisepass"
                  error={errors.reisepass}
                  options={foreignerOptions}
                  color={this.state.reisepass}
                />
                <label htmlFor="aufenthaltstitel">Aufenthaltstitel:</label>
                <ContractSelectListGroup
                  placeholder="aufenthaltstitel"
                  onChange={this.onChange}
                  value={this.state.aufenthaltstitel}
                  name="aufenthaltstitel"
                  error={errors.aufenthaltstitel}
                  options={foreignerOptions}
                  color={this.state.aufenthaltstitel}
                />

                <label htmlFor="stipendium">Stipendiumsbescheinigung:</label>
                <ContractSelectListGroup
                  placeholder="stipendium"
                  onChange={this.onChange}
                  value={this.state.stipendium}
                  name="stipendium"
                  error={errors.stipendium}
                  options={foreignerOptions}
                  color={this.state.stipendium}
                />

                <label htmlFor="abschlusszeugnis">Abschlusszeugnis:</label>
                <ContractSelectListGroup
                  placeholder="abschlusszeugnis"
                  onChange={this.onChange}
                  value={this.state.abschlusszeugnis}
                  name="abschlusszeugnis"
                  error={errors.abschlusszeugnis}
                  options={foreignerOptions}
                  color={this.state.stipendium}
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
  contract: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  contract: state.contract,
  application: state.application,
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getContractOfID,
  updateContract,
  downloadEV,
  getAdvisors,
  getAdmins,
  getContractsForContract,
})(withRouter(EditContract));
