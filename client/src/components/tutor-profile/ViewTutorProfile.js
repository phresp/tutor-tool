import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import moment from "moment";
import verfassungsPruefung from "../common/VerfassungschutzCountries";

import { createProfile, getProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import countryList from "react-select-country-list";

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
      processable: "True",
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
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    var countryOptions = countryList().getData();
    console.log(this.state.nationality);
    //Select options for status
    const statusOptions = [
      { label: "Select your gender", value: "" },
      { label: "male", value: "male" },
      { label: "female", value: "female" },
      { label: "divers", value: "divers" },
    ];

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
                Change Account Type
              </Link>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Firstname"
                  onChange={this.onChange}
                  value={this.state.firstname}
                  name="firstname"
                  error={errors.firstname}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <TextFieldGroup
                  placeholder="* Lastname"
                  onChange={this.onChange}
                  value={this.state.lastname}
                  name="lastname"
                  error={errors.lastname}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <SelectListGroup
                  placeholder="* Gender"
                  onChange={this.onChange}
                  value={this.state.gender}
                  name="gender"
                  error={errors.gender}
                  options={statusOptions}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <TextFieldGroup
                  type={"date"}
                  placeholder="* Birthday"
                  onChange={this.onChange}
                  value={moment.utc(this.state.birthday).format("YYYY-MM-DD")}
                  name="birthday"
                  error={errors.birthday}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <label htmlFor="birthplace">* Birthplace:</label>
                <TextFieldGroup
                  placeholder="* Birthplace"
                  onChange={this.onChange}
                  value={this.state.birthplace}
                  name="birthplace"
                  error={errors.birthplace}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <label htmlFor="countryofbirth">* Country of Birth:</label>
                {verfassungsPruefungTooltipCountryofbirth}
                <SelectListGroup
                  placeholder="* Country of Birth"
                  onChange={this.onChange}
                  value={this.state.countryofbirth}
                  name="countryofbirth"
                  error={errors.countryofbirth}
                  options={countryOptions}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <label htmlFor="nationality">* Nationality:</label>
                {verfassungsPruefungTooltipNationality}
                <SelectListGroup
                  placeholder="* Nationality"
                  onChange={this.onChange}
                  value={this.state.nationality}
                  name="nationality"
                  error={errors.nationality}
                  options={countryOptions}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <label htmlFor="nationality2">Second Nationality:</label>
                {verfassungsPruefungTooltipNationality2}
                <SelectListGroup
                  placeholder="Second Nationality"
                  onChange={this.onChange}
                  value={this.state.nationality2}
                  name="nationality2"
                  error={errors.nationality2}
                  options={countryOptions}
                  info="Please provide your second nationality if you have one"
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <TextFieldGroup
                  placeholder="* Matrikelnummer"
                  onChange={this.onChange}
                  value={this.state.matrikelnummer}
                  name="matrikelnummer"
                  error={errors.matrikelnummer}
                  disabled={this.state.processable ? "disabled" : ""}
                />
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

export default connect(mapStateToProps, { createProfile, getProfile })(
  withRouter(ViewTutorProfile)
);
