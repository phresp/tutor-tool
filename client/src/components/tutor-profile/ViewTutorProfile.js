import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import moment from "moment";
import verfassungsPruefung from "../common/VerfassungschutzCountries";

import { updateProfileOfId, getProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import countryList from "react-select-country-list";
import aufenthaltfreieCountries from "../common/AufenthaltCountries";

class ViewTutorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      firstname: "",
      gender: "",
      matrikelnummer: "",
      birthday: "",
      nationality: "",
      nationality2: "",
      birthplace: "",
      countryofbirth: "",
      aufenthaltend: "",
      stipendiumend: "",
      degree: "",
      currentfieldofstudy: "",
      disabled: true,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);

    if (countryList().data[0].value !== "") {
      countryList().setEmpty("Select a Country").getLabel("");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      //If profile field doesn't exist, make empty string
      profile.lastname = !isEmpty(profile.lastname) ? profile.lastname : "";
      profile.firstname = !isEmpty(profile.firstname) ? profile.firstname : "";
      profile.gender = !isEmpty(profile.gender) ? profile.gender : "";
      profile.matrikelnummer = !isEmpty(profile.matrikelnummer)
        ? profile.matrikelnummer
        : "";
      profile.natrionality = !isEmpty(profile.natrionality)
        ? profile.natrionality
        : "";
      profile.nationality2 = !isEmpty(profile.nationality2)
        ? profile.nationality2
        : "";
      profile.birthday = !isEmpty(profile.birthday) ? profile.birthday : "";
      profile.birthplace = !isEmpty(profile.birthplace)
        ? profile.birthplace
        : "";
      profile.countryofbirth = !isEmpty(profile.countryofbirth)
        ? profile.countryofbirth
        : "";
      profile.currentfieldofstudy = !isEmpty(profile.currentfieldofstudy)
        ? profile.currentfieldofstudy
        : "";
      profile.stipendiumend = !isEmpty(profile.stipendiumend)
        ? profile.stipendiumend
        : "";
      profile.degree = !isEmpty(profile.degree) ? profile.degree : "";
      profile.aufenthaltend = !isEmpty(profile.aufenthaltend)
        ? profile.aufenthaltend
        : "";

      //Set component fields state
      this.setState({
        lastname: profile.lastname,
        firstname: profile.firstname,
        gender: profile.gender,
        matrikelnummer: profile.matrikelnummer,
        nationality: profile.nationality,
        nationality2: profile.nationality2,
        birthday: profile.birthday,
        birthplace: profile.birthplace,
        countryofbirth: profile.countryofbirth,
        currentfieldofstudy: profile.currentfieldofstudy,
        degree: profile.degree,
        stipendiumend: profile.stipendiumend,
        aufenthaltend: profile.aufenthaltend,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      gender: this.state.gender,
      matrikelnummer: this.state.matrikelnummer,
      birthday: this.state.birthday,
      nationality: this.state.nationality,
      nationality2: this.state.nationality2,
      birthplace: this.state.birthplace,
      countryofbirth: this.state.countryofbirth,
      currentfieldofstudy: this.state.currentfieldofstudy,
      degree: this.state.degree,
      stipendiumend: this.state.stipendiumend,
      aufenthaltend: this.state.aufenthaltend,
    };
    this.props.updateProfileOfId(
      profileData,
      this.props.match.params.id,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    var countryOptions = countryList().getData();
    //Select options for status
    const statusOptions = [
      { label: "Geschlecht auswählen", value: "" },
      { label: "Männlich", value: "male" },
      { label: "Weiblich", value: "female" },
      { label: "Divers", value: "divers" },
    ];

    //Select options for degree
    const degreeOptions = [
      { label: "None", value: "" },
      { label: "Bachelor(FH,Uni)/Diplom(FH)/Master(FH)", value: "Bachelor" },
      { label: "Master(Uni)", value: "Master" },
      { label: "Diplom(Uni)", value: "Diplom" },
    ];

    var aufenthaltInput;
    var aufenthaltLabel;

    if (
      aufenthaltfreieCountries.indexOf(this.state.nationality) === -1 &&
      (aufenthaltfreieCountries.indexOf(this.state.nationality2) === -1 ||
        this.state.nationality2 === "")
    ) {
      aufenthaltLabel = <label htmlFor="Aufenthalt">Aufenthalt Ende:</label>;
      aufenthaltInput = (
        <TextFieldGroup
          type={"date"}
          placeholder="Aufenthaltstitel Ende"
          onChange={this.onChange}
          value={moment.utc(this.state.aufenthaltend).format("YYYY-MM-DD")}
          name="aufenthaltend"
          error={errors.aufenthaltend}
          disabled={this.state.disabled ? "disabled" : ""}
        />
      );
    }

    var verfassungsPruefungTooltipNationality = <div></div>;
    var verfassungsPruefungTooltipCountryofbirth = <div></div>;
    var verfassungsPruefungTooltipNationality2 = <div></div>;

    if (verfassungsPruefung.indexOf(this.state.nationality) !== -1) {
      verfassungsPruefungTooltipNationality = (
        <h3 className="text-danger">Verfassungsprüfung Necessary!</h3>
      );
    } else {
      verfassungsPruefungTooltipNationality = <div></div>;
    }

    if (verfassungsPruefung.indexOf(this.state.countryofbirth) !== -1) {
      verfassungsPruefungTooltipCountryofbirth = (
        <h3 className="text-danger">Verfassungsprüfung Necessary!</h3>
      );
    } else {
      verfassungsPruefungTooltipCountryofbirth = <div></div>;
    }

    if (verfassungsPruefung.indexOf(this.state.nationality2) !== -1) {
      verfassungsPruefungTooltipNationality2 = (
        <h3 className="text-danger">Verfassungsprüfung Necessary!</h3>
      );
    } else {
      verfassungsPruefungTooltipNationality2 = <div></div>;
    }

    var submitButton;
    if (!this.state.disabled) {
      submitButton = (
        <input
          type="submit"
          value="Bestätigen"
          className="btn btn-info btn-block mt-4"
        />
      );
    }

    return (
      <div className={"create-profile"}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/tutor-overview"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">
                Profile of <br />
                {this.state.firstname} {this.state.lastname}{" "}
              </h1>
              <Link
                to={`/changeAccountType/${this.props.match.params.id}`}
                className={"btn btn-primary"}
              >
                Rolle ändern
              </Link>
              <button
                type="button"
                onClick={() => {
                  this.setState((prevState) => ({
                    disabled: !prevState.disabled,
                  }));
                }}
                className="btn btn-dark"
              >
                Bearbeiten an/aus
              </button>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="firstname">Vorname:</label>
                <TextFieldGroup
                  placeholder="Vorname"
                  onChange={this.onChange}
                  value={this.state.firstname}
                  name="firstname"
                  error={errors.firstname}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <label htmlFor="lastname">Nachname:</label>
                <TextFieldGroup
                  placeholder="Nachname"
                  onChange={this.onChange}
                  value={this.state.lastname}
                  name="lastname"
                  error={errors.lastname}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <label htmlFor="Geschlecht">Geschlecht:</label>
                <SelectListGroup
                  placeholder="Geschlecht"
                  onChange={this.onChange}
                  value={this.state.gender}
                  name="gender"
                  error={errors.gender}
                  options={statusOptions}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <label htmlFor="birthday">Geburtstag:</label>
                <TextFieldGroup
                  type={"date"}
                  placeholder="Geburtstag"
                  onChange={this.onChange}
                  value={moment.utc(this.state.birthday).format("YYYY-MM-DD")}
                  name="birthday"
                  error={errors.birthday}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <label htmlFor="birthplace">* Geburtsort:</label>
                <TextFieldGroup
                  placeholder="Geburtsort"
                  onChange={this.onChange}
                  value={this.state.birthplace}
                  name="birthplace"
                  error={errors.birthplace}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <label htmlFor="countryofbirth">Geburtsland:</label>
                {verfassungsPruefungTooltipCountryofbirth}
                <SelectListGroup
                  placeholder="* Country of Birth"
                  onChange={this.onChange}
                  value={this.state.countryofbirth}
                  name="countryofbirth"
                  error={errors.countryofbirth}
                  options={countryOptions}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <label htmlFor="nationality">Nationaliät:</label>
                {verfassungsPruefungTooltipNationality}
                <SelectListGroup
                  placeholder="* Nationality"
                  onChange={this.onChange}
                  value={this.state.nationality}
                  name="nationality"
                  error={errors.nationality}
                  options={countryOptions}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <label htmlFor="nationality2">Zweite Nationalität:</label>
                {verfassungsPruefungTooltipNationality2}
                <SelectListGroup
                  placeholder="Second Nationality"
                  onChange={this.onChange}
                  value={this.state.nationality2}
                  name="nationality2"
                  error={errors.nationality2}
                  options={countryOptions}
                  disabled={this.state.disabled ? "disabled" : ""}
                />

                {aufenthaltLabel}
                {aufenthaltInput}
                <div className="container">
                  <div className="row">
                    <label htmlFor="Stipendium">Stipendium Ende:</label>
                    <div className={"col-md-5"}></div>
                    <div className={"col-md-3"}>
                      <button
                        className={"btn btn-light"}
                        type="button"
                        disabled={this.state.disabled ? "disabled" : ""}
                        onClick={() => {
                          this.setState({
                            stipendiumend: "",
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
                  placeholder="Stipendium Ende"
                  onChange={this.onChange}
                  value={moment
                    .utc(this.state.stipendiumend)
                    .format("YYYY-MM-DD")}
                  name="stipendiumend"
                  error={errors.stipendiumend}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <label htmlFor="matrikelnummer">Matrikelnummer:</label>

                <TextFieldGroup
                  placeholder="* Matrikelnummer"
                  onChange={this.onChange}
                  value={this.state.matrikelnummer}
                  name="matrikelnummer"
                  error={errors.matrikelnummer}
                  disabled={this.state.disabled ? "disabled" : ""}
                />

                <label htmlFor="CurrentFieldofStudy">Studiengang:</label>
                <TextFieldGroup
                  placeholder="Current Field of Study"
                  onChange={this.onChange}
                  value={this.state.currentfieldofstudy}
                  name="currentfieldofstudy"
                  error={errors.currentfieldofstudy}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <label htmlFor="degree">Abschluss:</label>
                <SelectListGroup
                  placeholder="Degree"
                  onChange={this.onChange}
                  value={this.state.degree}
                  name="degree"
                  error={errors.degree}
                  options={degreeOptions}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                {submitButton}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewTutorProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { updateProfileOfId, getProfile })(
  withRouter(ViewTutorProfile)
);
