import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import ContractSelectListGroup from "../common/ContractSelectListGroup";
import SelectListGroup from "../common/SelectListGroup";
import moment from "moment";
import countryList from "react-select-country-list";

import { getCurrentProfile } from "../../actions/profileActions";
import {
  getContractOfID,
  updateContract,
  getContractsForContract,
  deleteContract,
  createSeparateContract,
} from "../../actions/contractActions";
import { downloadEV } from "../../actions/formsActions";
import { getAdvisors, getAdmins } from "../../actions/profileActions";

import isEmpty from "../../validation/is-empty";

import verfassungsPruefung from "../common/VerfassungschutzCountries";
import aufenthaltfreieCountries from "../common/AufenthaltCountries";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class EditContract extends Component {
  componentDidMount() {
    this.props.getContractOfID(this.props.match.params.id);
    this.props.getContractsForContract(this.props.match.params.id);
    this.props.getAdvisors();
    this.props.getAdmins();
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
      profiledegree: "",
      newcontract: "True",
      merkblatt: "",
      einstellungsvorschlag: "",
      versicherungspflicht: "",
      scientology: "",
      verfassungstreue: "",
      immatrikulationsbescheinigung0: "",
      immatrikulationsbescheinigung: "",
      immatrikulationsbescheinigung2: "",
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
      contractcomment: "",
      displayContractsplitting: false,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSeparateContractClick = this.onSeparateContractClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      window.location.reload();
    }

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

      contract.degree = !isEmpty(contract.degree) ? contract.degree : "";
      if (contract.degree === "") {
        if (contract.profile) {
          if (contract.profile.degree !== "") {
            contract.degree = contract.profile.degree;
          }
        }
      }
      contract.newcontract = !isEmpty(contract.newcontract)
        ? contract.newcontract
        : "True";
      contract.merkblatt = !isEmpty(contract.merkblatt)
        ? contract.merkblatt
        : "Fehlt";
      contract.einstellungsvorschlag = !isEmpty(contract.einstellungsvorschlag)
        ? contract.einstellungsvorschlag
        : "Fehlt";
      contract.versicherungspflicht = !isEmpty(contract.versicherungspflicht)
        ? contract.versicherungspflicht
        : "Fehlt";
      contract.scientology = !isEmpty(contract.scientology)
        ? contract.scientology
        : "Fehlt";
      contract.verfassungstreue = !isEmpty(contract.verfassungstreue)
        ? contract.verfassungstreue
        : "Fehlt";
      contract.immatrikulationsbescheinigung0 = !isEmpty(
        contract.immatrikulationsbescheinigung0
      )
        ? contract.immatrikulationsbescheinigung0
        : "";
      contract.immatrikulationsbescheinigung = !isEmpty(
        contract.immatrikulationsbescheinigung
      )
        ? contract.immatrikulationsbescheinigung
        : "Fehlt";
      contract.immatrikulationsbescheinigung2 = !isEmpty(
        contract.immatrikulationsbescheinigung2
      )
        ? contract.immatrikulationsbescheinigung2
        : "";
      contract.aufenthaltstitel = !isEmpty(contract.aufenthaltstitel)
        ? contract.aufenthaltstitel
        : "Fehlt";
      contract.krankenkassenbescheinigung = !isEmpty(
        contract.krankenkassenbescheinigung
      )
        ? contract.krankenkassenbescheinigung
        : "Fehlt";
      contract.personalbogenbezuegestelle = !isEmpty(
        contract.personalbogenbezuegestelle
      )
        ? contract.personalbogenbezuegestelle
        : "Fehlt";
      contract.personalbogenstudierende = !isEmpty(
        contract.personalbogenstudierende
      )
        ? contract.personalbogenstudierende
        : "Fehlt";
      contract.sozialversicherungsausweis = !isEmpty(
        contract.sozialversicherungsausweis
      )
        ? contract.sozialversicherungsausweis
        : "Fehlt";
      contract.steuerId = !isEmpty(contract.steuerId)
        ? contract.steuerId
        : "Fehlt";
      contract.stipendium = !isEmpty(contract.stipendium)
        ? contract.stipendium
        : "Fehlt";
      contract.abschlusszeugnis = !isEmpty(contract.abschlusszeugnis)
        ? contract.abschlusszeugnis
        : "Fehlt";
      contract.reisepass = !isEmpty(contract.reisepass)
        ? contract.reisepass
        : "Fehlt";
      contract.contractcomment = !isEmpty(contract.contractcomment)
        ? contract.contractcomment
        : "";

      contract.status = !isEmpty(contract.status) ? contract.status : "";
      contract.profiledegree = "";
      if (contract.profile.degree) {
        contract.profiledegree = !isEmpty(contract.profile.degree)
          ? contract.profile.degree
          : "";
      }
      if (contract.contractstart2 || contract.contractend2 || contract.hours2) {
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
        degree: contract.degree,
        profiledegree: contract.profiledegree,
        newcontract: contract.newcontract,
        merkblatt: contract.merkblatt,
        einstellungsvorschlag: contract.einstellungsvorschlag,
        versicherungspflicht: contract.versicherungspflicht,
        scientology: contract.scientology,
        verfassungstreue: contract.verfassungstreue,
        immatrikulationsbescheinigung0: contract.immatrikulationsbescheinigung0,
        immatrikulationsbescheinigung: contract.immatrikulationsbescheinigung,
        immatrikulationsbescheinigung2: contract.immatrikulationsbescheinigung2,
        aufenthaltstitel: contract.aufenthaltstitel,
        krankenkassenbescheinigung: contract.krankenkassenbescheinigung,
        personalbogenbezuegestelle: contract.personalbogenbezuegestelle,
        personalbogenstudierende: contract.personalbogenstudierende,
        sozialversicherungsausweis: contract.sozialversicherungsausweis,
        steuerId: contract.steuerId,
        reisepass: contract.reisepass,
        stipendium: contract.stipendium,
        abschlusszeugnis: contract.abschlusszeugnis,
        contractcomment: contract.contractcomment,
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

  onSeparateContractClick(e) {
    e.preventDefault();
    const contractData = {
      user: this.state.user,
      profile: this.state.profile,
      course: this.state.course,
      status: "Created",
      lasthandle: this.props.profile.profile.handle,
    };

    this.props.createSeparateContract(contractData, this.props.history);
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
      reisepass: this.state.reisepass,
      stipendium: this.state.stipendium,
      abschlusszeugnis: this.state.abschlusszeugnis,
      krankenkassenbescheinigung: this.state.krankenkassenbescheinigung,
      personalbogenbezuegestelle: this.state.personalbogenbezuegestelle,
      personalbogenstudierende: this.state.personalbogenstudierende,
      sozialversicherungsausweis: this.state.sozialversicherungsausweis,
      steuerId: this.state.steuerId,
      contractcomment: this.state.contractcomment,
      lasthandle: this.props.profile.profile.handle,
      status: this.state.status,
    };

    this.props.updateContract(
      this.props.match.params.id,
      contractData,
      this.state.status,
      this.props.history
    );
  }

  onDownloadClick(e) {
    e.preventDefault();

    var nat = "";
    if (this.props.contract.contract.profile.nationality) {
      nat = countryList().getLabel(
        this.props.contract.contract.profile.nationality
      );
    }

    var nat2 = "";
    if (this.props.contract.contract.profile.nationality2) {
      nat2 = countryList().getLabel(
        this.props.contract.contract.profile.nationality2
      );
    }

    var cob = "";
    if (this.props.contract.contract.profile.countryofbirth) {
      cob = countryList().getLabel(
        this.props.contract.contract.profile.countryofbirth
      );
    }

    const evData = {
      name: "Einstellungsvorschlag",
      lastname: this.props.contract.contract.profile.lastname,
      firstname: this.props.contract.contract.profile.firstname,
      newcontract: this.state.newcontract,
      advisorlastname: this.state.advisorlastname,
      advisorfirstname: this.state.advisorfirstname,
      adminlastname: this.state.adminlastname,
      adminfirstname: this.state.adminfirstname,
      natforausweis: this.props.contract.contract.profile.nationality,
      nationality: nat,
      nationality2: nat2,
      birthplace: this.props.contract.contract.profile.birthplace,
      countryofbirth: cob,
      birthday: this.props.contract.contract.profile.birthday,
      contractstart: this.state.contractstart,
      contractend: this.state.contractend,
      contractstart2: this.state.contractstart2,
      contractend2: this.state.contractend2,
      degree: this.state.degree,
      hours: this.state.hours,
      hours2: this.state.hours2,
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
      immatrikulationsbescheinigung0: this.state.immatrikulationsbescheinigung0,
      immatrikulationsbescheinigung2: this.state.immatrikulationsbescheinigung2,
      aufenthaltstitel: this.state.aufenthaltstitel,
      reisepass: this.state.reisepass,
      stipendium: this.state.stipendium,
      stipendiumdate: this.state.profile.stipendiumend,
      krankenkassenbescheinigung: this.state.krankenkassenbescheinigung,
      personalbogenbezuegestelle: this.state.personalbogenbezuegestelle,
      personalbogenstudierende: this.state.personalbogenstudierende,
      sozialversicherungsausweis: this.state.sozialversicherungsausweis,
      steuerId: this.state.steuerId,
      abschlusszeugnis: this.state.abschlusszeugnis,
    };
    this.props.downloadEV(evData);
  }

  onDeleteClick(e) {
    this.props.deleteContract(this.props.match.params.id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displayContractsplitting, profile } = this.state;

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

    if (this.props.contract.contract) {
      if (this.props.contract.contract.profile) {
        if (
          aufenthaltfreieCountries.indexOf(
            this.props.contract.contract.profile.nationality
          ) !== -1 ||
          aufenthaltfreieCountries.indexOf(
            this.props.contract.contract.profile.nationality2
          ) !== -1
        ) {
          if (
            this.state.reisepass !== "Kein Bedarf" ||
            this.state.aufenthaltstitel !== "Kein Bedarf"
          ) {
            this.setState({
              reisepass: "Kein Bedarf",
              aufenthaltstitel: "Kein Bedarf",
            });
          }
        }
      }
    }

    //Query for Stipendium
    if (this.props.contract.contract) {
      if (this.props.contract.contract.profile) {
        if (!this.props.contract.contract.profile.stipendiumend) {
          this.state.stipendium = "Kein Bedarf";
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

    if (this.state.profiledegree !== this.state.degree) {
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
      if (end.setDate(end.getDate() + 1) != start2.setDate(start2.getDate())) {
        this.setState({ contractstart2: moment.utc(end).format("YYYY-MM-DD") });
      }
    }

    //TODO: Abgelaufene Daten Tooltipp
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

    if (this.state.displayContractsplitting) {
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
            value={moment.utc(this.state.contractstart2).format("YYYY-MM-DD")}
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
        </div>
      );
    }

    //Immatrikulation Folgesemester
    var immatrikulationNextSem;
    var immatrikulationNextSemLabel;
    var { contract } = this.props.contract;
    if (contract) {
      if (contract.course.semester) {
        if (
          new Date(contract.course.semester.to) <
            new Date(this.state.contractend) ||
          new Date(contract.course.semester.to) <
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

    //Immatrikulation vorheriges Semester
    var immatrikulationPrevSem;
    var immatrikulationPrevSemLabel;
    var { contract } = this.props.contract;
    if (contract) {
      if (contract.course.semester) {
        if (
          new Date(contract.course.semester.from) >
            new Date(this.state.contractstart) ||
          new Date(contract.course.semester.from) >
            new Date(this.state.contractstart2)
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
              <Link to={"/contracts"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">
                Vertrag von <br /> {contractname} <br /> für {contractcourse}
                {verfassungsPruefungTooltip}
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="btn-group">
                  <button
                    type="button"
                    onClick={this.onDownloadClick.bind(this)}
                    className="btn btn-secondary"
                  >
                    EV exportieren
                  </button>

                  <button
                    onClick={this.onSeparateContractClick.bind(this)}
                    className="btn btn-dark"
                  >
                    Weiteren Vertrag anlegen
                  </button>
                  <button
                    type="button"
                    onClick={this.onDeleteClick.bind(this)}
                    className="btn btn-danger"
                  >
                    Vertrag löschen
                  </button>
                  <button onClick="Submit" className="btn btn-primary">
                    Bestätigen
                  </button>
                </div>
                <p></p>
                <label htmlFor="status">Status:</label>
                <SelectListGroup
                  placeholder="status"
                  onChange={this.onChange}
                  value={this.state.status}
                  name="status"
                  error={errors.status}
                  options={statusOptions}
                />

                <label htmlFor="degree">Kommentar:</label>
                <TextAreaFieldGroup
                  placeholder="Kommentar"
                  onChange={this.onChange}
                  value={this.state.contractcomment}
                  name="contractcomment"
                  error={errors.contractcomment}
                />

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
                  value={moment
                    .utc(this.state.contractstart)
                    .format("YYYY-MM-DD")}
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

                <label htmlFor="abschlusszeugnis">Abschlusszeugnis:</label>
                <ContractSelectListGroup
                  placeholder="abschlusszeugnis"
                  onChange={this.onChange}
                  value={this.state.abschlusszeugnis}
                  name="abschlusszeugnis"
                  error={errors.abschlusszeugnis}
                  options={foreignerOptions}
                  color={this.state.abschlusszeugnis}
                />

                <div className="row">
                  <div className="col-md-9">
                    <label htmlFor="einstellungsvorschlag">
                      Einstellungsvorschlag:
                    </label>
                  </div>
                  <div className="col-md-3">
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(this)}
                      className="btn btn-primary"
                    >
                      EV exportieren
                    </button>
                  </div>
                </div>
                <ContractSelectListGroup
                  placeholder="einstellungsvorschlag"
                  onChange={this.onChange}
                  value={this.state.einstellungsvorschlag}
                  name="einstellungsvorschlag"
                  error={errors.einstellungsvorschlag}
                  options={formsOptions}
                  color={this.state.einstellungsvorschlag}
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
  deleteContract,
  getCurrentProfile,
  createSeparateContract,
})(withRouter(EditContract));
