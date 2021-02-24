import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import ContractSelectListGroup from "../common/ContractSelectListGroup";
import moment from "moment";

import { getCurrentProfile } from "../../actions/profileActions";
import {
  createContract,
  getContractsForApplication,
  createContractWithAdditional,
} from "../../actions/contractActions";

import { getApplicationOfId } from "../../actions/applicationActions";

import verfassungsPruefung from "../common/VerfassungschutzCountries";
import aufenthaltfreieCountries from "../common/AufenthaltCountries";

class CreateContract extends Component {
  componentDidMount() {
    this.props.getApplicationOfId(this.props.match.params.id);
    this.props.getContractsForApplication(this.props.match.params.id);
    this.props.getCurrentProfile();
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
      degree: "",
      newcontract: "True",
      merkblatt: "Fehlt",
      einstellungsvorschlag: "Fehlt",
      versicherungspflicht: "Fehlt",
      scientology: "Fehlt",
      verfassungstreue: "Fehlt",
      immatrikulationsbescheinigung0: "",
      immatrikulationsbescheinigung: "Fehlt",
      immatrikulationsbescheinigung2: "",
      aufenthaltstitel: "Fehlt",
      krankenkassenbescheinigung: "Fehlt",
      personalbogenbezuegestelle: "Fehlt",
      personalbogenstudierende: "Fehlt",
      steuerId: "Fehlt",
      reisepass: "Fehlt",
      stipendium: "Fehlt",
      abschlusszeugnis: "Fehlt",
      status: "Incomplete",
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

    //Get degree
    if (nextProps.application.application) {
      if (nextProps.application.application.profile)
        this.setState({
          degree: nextProps.application.application.profile.degree,
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
      contractstart2: this.state.contractstart2,
      contractend2: this.state.contractend2,
      hours2: this.state.hours2,
      degree: this.state.degree,
      newcontract: this.state.newcontract,
      merkblatt: this.state.merkblatt,
      einstellungsvorschlag: this.state.einstellungsvorschlag,
      versicherungspflicht: this.state.versicherungspflicht,
      scientology: this.state.scientology,
      verfassungstreue: this.state.verfassungstreue,
      immatrikulationsbescheinigung0: this.state.immatrikulationsbescheinigung0,
      immatrikulationsbescheinigung: this.state.immatrikulationsbescheinigung,
      immatrikulationsbescheinigung2: this.state.immatrikulationsbescheinigung2,
      aufenthaltstitel: this.state.aufenthaltstitel,
      krankenkassenbescheinigung: this.state.krankenkassenbescheinigung,
      personalbogenbezuegestelle: this.state.personalbogenbezuegestelle,
      personalbogenstudierende: this.state.personalbogenstudierende,
      steuerId: this.state.steuerId,
      reisepass: this.state.reisepass,
      stipendium: this.state.stipendium,
      lasthandle: this.props.profile.profile.handle,
      status: this.state.status,
    };

    this.props.createContract(
      contractData,
      this.props.application.application.course._id,
      this.props.history
    );
  }

  onSeparateSubmit(e) {
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
      degree: this.state.degree,
      newcontract: this.state.newcontract,
      merkblatt: this.state.merkblatt,
      einstellungsvorschlag: this.state.einstellungsvorschlag,
      versicherungspflicht: this.state.versicherungspflicht,
      scientology: this.state.scientology,
      verfassungstreue: this.state.verfassungstreue,
      immatrikulationsbescheinigung0: this.state.immatrikulationsbescheinigung0,
      immatrikulationsbescheinigung: this.state.immatrikulationsbescheinigung,
      immatrikulationsbescheinigung2: this.state.immatrikulationsbescheinigung2,
      aufenthaltstitel: this.state.aufenthaltstitel,
      krankenkassenbescheinigung: this.state.krankenkassenbescheinigung,
      personalbogenbezuegestelle: this.state.personalbogenbezuegestelle,
      personalbogenstudierende: this.state.personalbogenstudierende,
      steuerId: this.state.steuerId,
      reisepass: this.state.reisepass,
      stipendium: this.state.stipendium,
      lasthandle: this.props.profile.profile.handle,
      status: this.state.status,
    };

    const separateData = {
      user: this.state.user,
      profile: this.state.profile,
      course: this.state.course,
      status: "Created",
      lasthandle: this.props.profile.profile.handle,
    };

    this.props.createContractWithAdditional(
      contractData,
      separateData,
      this.props.application.application.course._id,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displayContractsplitting } = this.state;

    //back Button
    var backButton = (
      <Link to={"/course-overview"} className={"btn btn-light"}>
        back
      </Link>
    );

    if (this.props.application.application) {
      backButton = (
        <Link
          to={`/course-applications/${this.props.application.application.course._id}`}
          className={"btn btn-light"}
        >
          back
        </Link>
      );
    }

    //Get User ID
    if (this.props.application.application) {
      if (this.props.application.application.user)
        this.state.user = this.props.application.application.user._id;
    }
    // Get profile ID
    if (this.props.application.application) {
      if (this.props.application.application.profile)
        this.state.profile = this.props.application.application.profile._id;
    }

    //Get Course ID
    if (this.props.application.application) {
      if (this.props.application.application.course)
        this.state.course = this.props.application.application.course._id;
    }

    //Get application ID
    if (this.props.application.application) {
      this.state.applicationID = this.props.application.application._id;
    }

    //Get profile ID
    var profile;
    if (this.props.application.application) {
      profile = this.props.application.application.profile;
    }

    //Name and course
    var contractname = "";
    if (this.props.application.application) {
      if (this.props.application.application.profile) {
        contractname =
          this.props.application.application.profile.firstname +
          " " +
          this.props.application.application.profile.lastname;
      }
    }

    var contractcourse;
    if (this.props.application.application) {
      contractcourse = this.props.application.application.course.metacourse
        .name;
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
      { label: "Keiner", value: "" },
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
        this.state.personalbogenbezuegestelle !== "Liegt vor" ||
        this.state.steuerId !== "Liegt vor")
    ) {
      this.setState({
        scientology: "Liegt vor",
        verfassungstreue: "Liegt vor",
        krankenkassenbescheinigung: "Liegt vor",
        personalbogenstudierende: "Liegt vor",
        personalbogenbezuegestelle: "Liegt vor",
        steuerId: "Liegt vor",
      });
    }

    //Query for Reisepass and aufenthaltstitel
    if (this.props.application.application) {
      if (this.props.application.application.profile) {
        if (this.props.application.application.profile.nationality) {
          if (
            aufenthaltfreieCountries.indexOf(
              this.props.application.application.profile.nationality
            ) !== -1 &&
            (aufenthaltfreieCountries.indexOf(
              this.props.application.application.profile.nationality2
            ) !== -1 ||
              this.props.application.application.profile.nationality2 === "")
          ) {
            this.state.reisepass = "Kein Bedarf";
            this.state.aufenthaltstitel = "Kein Bedarf";
          }
        }
      }
    }
    //Query for Abschlusszeugnis
    if (
      this.state.degree === "" &&
      this.state.abschlusszeugnis !== "Kein Bedarf"
    ) {
      this.state.abschlusszeugnis = "Kein Bedarf";
    } else if (
      this.state.degree !== "" &&
      this.state.abschlusszeugnis === "Kein Bedarf"
    ) {
      this.state.abschlusszeugnis = "Fehlt";
    }

    //Query for Stipendium
    if (this.props.application.application) {
      if (this.props.application.application.profile) {
        if (!this.props.application.application.profile.stipendiumend) {
          this.state.stipendium = "Kein Bedarf";
        }
      }
    }

    //Verfassungsschutz Tooltip if necessary
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

    //20 Hour Max Calculations Date 1
    var contracts = [];
    if (this.props.contract.contracts) {
      contracts = this.props.contract.contracts;
    }
    var hoursum = this.state.hours;
    var hoursummessage = <div></div>;
    if (contracts !== []) {
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
      contracts.forEach((element) => {
        const overlap = Math.max(
          0,
          Math.min.apply(null, [
            new Date(this.state.contractend),
            new Date(element.contractend2),
          ]) -
            Math.max.apply(null, [
              new Date(this.state.contractstart),
              new Date(element.contractstart2),
            ])
        );
        if (overlap > 0) {
          hoursum = hoursum * 1 + element.hours2;
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
      contracts.forEach((element) => {
        const overlap = Math.max(
          0,
          Math.min.apply(null, [
            new Date(this.state.contractend2),
            new Date(element.contractend2),
          ]) -
            Math.max.apply(null, [
              new Date(this.state.contractstart2),
              new Date(element.contractstart2),
            ])
        );
        if (overlap > 0) {
          hoursum2 = hoursum2 * 1 + element.hours2;
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

    //Start Date2 becomes End Date1 +1 Day
    if (this.state.contractend && this.state.contractstart2) {
      var end = new Date(this.state.contractend);
      var start2 = new Date(this.state.contractstart2);
      if (end.setDate(end.getDate() + 1) !== start2.setDate(start2.getDate())) {
        this.setState({ contractstart2: moment.utc(end).format("YYYY-MM-DD") });
      }
    }

    var aufenthaltToolTipp;
    var stipendiumToolTipp;
    if (profile) {
      if (profile.aufenthaltend) {
        if (new Date(profile.aufenthaltend) < Date.now()) {
          aufenthaltToolTipp = (
            <h3 className="text-danger">Aufenthaltstitel abgelaufen!</h3>
          );
        }
      }
    }

    if (profile) {
      if (profile.stipendiumend) {
        if (
          new Date(profile.stipendiumend) < Date.now() &&
          profile.stipendiumend
        ) {
          stipendiumToolTipp = (
            <h3 className="text-danger">Stipendium abgelaufen!</h3>
          );
        }
      }
    }

    var aufenthaltende1;
    var aufenthaltende2;

    //Aufenthaltprüfung länger als Vertrag
    if (profile) {
      if (profile.aufenthaltend && this.state.contractend) {
        if (
          new Date(profile.aufenthaltend) < new Date(this.state.contractend)
        ) {
          aufenthaltende1 = (
            <h3 className="text-danger">
              Aufenthaltstitel endet am{" "}
              {moment.utc(profile.aufenthaltend).format("DD-MM-YYYY")}
            </h3>
          );
        }
      }
    }

    //Aufenthaltprüfung länger als Vertrag
    if (profile) {
      if (profile.aufenthaltend && this.state.contractend2) {
        if (
          new Date(profile.aufenthaltend) < new Date(this.state.contractend2)
        ) {
          aufenthaltende2 = (
            <h3 className="text-danger">
              Aufenthaltstitel endet am{" "}
              {moment.utc(profile.aufenthaltend).format("DD-MM-YYYY")}
            </h3>
          );
        }
      }
    }

    var vertragSplitting;

    if (displayContractsplitting) {
      vertragSplitting = (
        <div className="bg-light">
          <hr />
          <div className="container">
            <div className="row">
              {" "}
              <div className="col-md-9">
                <label htmlFor="contractstart">Vertrag Start 2:</label>
              </div>
              <div className={"col-md-3"}>
                <button
                  className={"btn btn-light"}
                  type="button"
                  onClick={() => {
                    this.setState({
                      contractstart2: "",
                    });
                  }}
                >
                  {" "}
                  Datum löschen
                </button>
              </div>
            </div>
          </div>

          <TextFieldGroup
            type={"date"}
            placeholder="Contract Start"
            onChange={this.onChange}
            value={this.state.contractstart2}
            name="contractstart2"
            error={errors.contractstart2}
          />
          {aufenthaltende2}
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <label htmlFor="contractend">Vertrag Ende 2:</label>
              </div>
              <div className={"col-md-3"}>
                <button
                  className={"btn btn-light"}
                  type="button"
                  onClick={() => {
                    this.setState({
                      contractend2: "",
                    });
                  }}
                >
                  {" "}
                  Datum löschen
                </button>
              </div>
            </div>
          </div>

          <TextFieldGroup
            type={"date"}
            placeholder="Contract End"
            onChange={this.onChange}
            value={this.state.contractend2}
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
        </div>
      );
    }

    //Immatrikulation Folgesemester
    var immatrikulationNextSem;
    var immatrikulationNextSemLabel;
    var application;
    if (this.props.application.application) {
      application = this.props.application.application;
    }
    if (application) {
      if (application.course) {
        if (application.course.semester) {
          if (
            new Date(application.course.semester.to) <
              new Date(this.state.contractend) ||
            new Date(application.course.semester.to) <
              new Date(this.state.contractend2)
          ) {
            immatrikulationNextSemLabel = (
              <label htmlFor="newContract">
                Immatrikulationsbescheinigung Folgesemester:
              </label>
            );
            immatrikulationNextSem = (
              <ContractSelectListGroup
                placeholder="immatrikulationsbescheinigung Folgesemester"
                onChange={this.onChange}
                value={this.state.immatrikulationsbescheinigung2}
                name="immatrikulationsbescheinigung2"
                error={errors.immatrikulationsbescheinigung2}
                options={formsOptions}
                color={this.state.immatrikulationsbescheinigung2}
              />
            );
          } else {
            if (this.state.immatrikulationsbescheinigung2 !== "") {
              this.state.immatrikulationsbescheinigung2 = "";
            }
          }
        }
      }
    }

    //Immatrikulation vorheriges Semester
    var immatrikulationPrevSem;
    var immatrikulationPrevSemLabel;
    var application;
    if (this.props.application.application) {
      application = this.props.application.application;
    }
    if (application) {
      if (application.course) {
        if (application.course.semester) {
          if (
            new Date(application.course.semester.from) >
              new Date(this.state.contractstart) ||
            new Date(application.course.semester.from) >
              new Date(this.state.contractstart)
          ) {
            immatrikulationPrevSemLabel = (
              <label htmlFor="newContract">
                Immatrikulationsbescheinigung vorheriges Semester:
              </label>
            );
            immatrikulationPrevSem = (
              <ContractSelectListGroup
                placeholder="immatrikulationsbescheinigung vorheriges Semester"
                onChange={this.onChange}
                value={this.state.immatrikulationsbescheinigung0}
                name="immatrikulationsbescheinigung0"
                error={errors.immatrikulationsbescheinigung0}
                options={formsOptions}
                color={this.state.immatrikulationsbescheinigung0}
              />
            );
          } else {
            if (this.state.immatrikulationsbescheinigung0 !== "") {
              this.state.immatrikulationsbescheinigung0 = "";
            }
          }
        }
      }
    }

    //Weiterbeschäftigung possible
    var weiterbeschäftigungTooltipp;
    if (contracts) {
      var contractstart = new Date(this.state.contractstart);
      var oneYearAgo = new Date(this.state.contractstart);
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      contracts.forEach((element) => {
        if (
          (new Date(element.contractend) > oneYearAgo ||
            new Date(element.contractend2) > oneYearAgo) &&
          ((new Date(element.contractstart) < contractstart &&
            element.contractstart) ||
            (new Date(element.contractstart2) < contractstart &&
              element.contractstart2))
        ) {
          weiterbeschäftigungTooltipp = <h5>Weiterbeschäftigung möglich</h5>;

          // if (
          //   this.state.newcontract === "True" ||
          //   this.state.newcontract === ""
          // ) {
          //   this.setState({ newcontract: "False" });
          // }
          if (
            (element.abschlusszeugnis === "Liegt vor" ||
              element.abschlusszeugnis === "Liegt bei") &&
            this.state.abschlusszeugnis !== "Liegt bei" &&
            this.state.degree !== ""
          ) {
            this.setState({ abschlusszeugnis: "Liegt vor" });
          }
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
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {backButton}
              <h1 className="display-4 text-center">
                Vertrag von <br /> {contractname} für {contractcourse}
              </h1>
              {verfassungsPruefungTooltip}
              <form onSubmit={this.onSubmit}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-9">
                      <label htmlFor="contractstart">Vertrag Start:</label>
                    </div>
                    <div className={"col-md-3"}>
                      <button
                        className={"btn btn-light"}
                        type="button"
                        onClick={() => {
                          this.setState({
                            contractstart: "",
                          });
                        }}
                      >
                        {" "}
                        Datum löschen
                      </button>
                    </div>
                  </div>
                </div>

                <TextFieldGroup
                  type={"date"}
                  placeholder="Contract Start"
                  onChange={this.onChange}
                  value={this.state.contractstart}
                  name="contractstart"
                  error={errors.contractstart}
                />
                {aufenthaltende1}
                <div className="container">
                  <div className="row">
                    <div className="col-md-9">
                      <label htmlFor="contractend">Vertrag Ende:</label>
                    </div>
                    <div className={"col-md-3"}>
                      <button
                        className={"btn btn-light"}
                        type="button"
                        onClick={() => {
                          this.setState({
                            contractend: "",
                          });
                        }}
                      >
                        {" "}
                        Datum löschen
                      </button>
                    </div>
                  </div>
                </div>

                <TextFieldGroup
                  type={"date"}
                  placeholder="Contract End"
                  onChange={this.onChange}
                  value={this.state.contractend}
                  name="contractend"
                  error={errors.contractend}
                />
                {hoursummessage}
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
                <ContractSelectListGroup
                  placeholder="Degree"
                  onChange={this.onChange}
                  value={this.state.degree}
                  name="degree"
                  error={errors.degree}
                  options={degreeOptions}
                />
                <label htmlFor="newContract">neuer Vertrag:</label>
                {weiterbeschäftigungTooltipp}
                <ContractSelectListGroup
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
                  options={formsOptions}
                  color={this.state.merkblatt}
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
                {immatrikulationPrevSemLabel}
                {immatrikulationPrevSem}
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
                {immatrikulationNextSemLabel}
                {immatrikulationNextSem}
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
                {aufenthaltToolTipp}
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
                {stipendiumToolTipp}
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
                <label htmlFor="stipendium">Abschlusszeugnis:</label>
                <ContractSelectListGroup
                  placeholder="abschlusszeugnis"
                  onChange={this.onChange}
                  value={this.state.abschlusszeugnis}
                  name="abschlusszeugnis"
                  error={errors.abschlusszeugnis}
                  options={foreignerOptions}
                  color={this.state.abschlusszeugnis}
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
                <label htmlFor="status">Status:</label>
                <SelectListGroup
                  placeholder="status"
                  onChange={this.onChange}
                  value={this.state.status}
                  name="status"
                  error={errors.status}
                  options={statusOptions}
                />
                <button
                  onClick={this.onSeparateSubmit.bind(this)}
                  className="btn btn-secondary"
                >
                  Submit und weiteren Vertrag anlegen
                </button>
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
  profile: state.profile,
  contract: state.contract,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  createContract,
  getApplicationOfId,
  getContractsForApplication,
  getCurrentProfile,
  createContractWithAdditional,
})(withRouter(CreateContract));
