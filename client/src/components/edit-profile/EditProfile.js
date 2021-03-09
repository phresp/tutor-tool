import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import moment from "moment";
import aufenthaltfreieCountries from "../common/AufenthaltCountries";

import {
  createProfile,
  getCurrentProfile,
  deleteAccount,
} from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import countryList from "react-select-country-list";
import Spinner from "../common/Spinner";
import isDivisibleBy from "validator/es/lib/isDivisibleBy";

class CreateProfile extends Component {
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
      currentfieldofstudy: "",
      degree: "",
      handle: "",
      receivemails: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (countryList().data[0].value !== "") {
      countryList().setEmpty("Select a Country").getLabel("");
    }
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
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
      profile.nationality = !isEmpty(profile.nationality)
        ? profile.nationality
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
      profile.aufenthaltend = !isEmpty(profile.aufenthaltend)
        ? profile.aufenthaltend
        : "";
      profile.stipendiumend = !isEmpty(profile.stipendiumend)
        ? profile.stipendiumend
        : "";
      profile.currentfieldofstudy = !isEmpty(profile.currentfieldofstudy)
        ? profile.currentfieldofstudy
        : "";
      profile.degree = !isEmpty(profile.degree) ? profile.degree : "";
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.receivemails = !isEmpty(profile.receivemails)
        ? profile.receivemails
        : false;

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
        aufenthaltend: profile.aufenthaltend,
        stipendiumend: profile.stipendiumend,
        currentfieldofstudy: profile.currentfieldofstudy,
        degree: profile.degree,
        handle: profile.handle,
        receivemails: profile.receivemails,
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
      aufenthaltend: this.state.aufenthaltend,
      stipendiumend: this.state.stipendiumend,
      currentfieldofstudy: this.state.currentfieldofstudy,
      degree: this.state.degree,
      handle: this.state.handle,
      receivemails: this.state.receivemails,
      role: this.props.auth.user.role,
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;

    var countryOptions = countryList().getData();

    //Select options for status
    const statusOptions = [
      { label: "Select your gender", value: "" },
      { label: "male", value: "male" },
      { label: "female", value: "female" },
      { label: "divers", value: "divers" },
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
      aufenthaltLabel = (
        <label htmlFor="Aufenthalt">Expiration date of residents permit:</label>
      );
      aufenthaltInput = (
        <TextFieldGroup
          type={"date"}
          placeholder="Aufenthaltstitel Ende"
          onChange={this.onChange}
          value={moment.utc(this.state.aufenthaltend).format("MM-dd-yyyy")}
          name="aufenthaltend"
          error={errors.aufenthaltend}
        />
      );
    }

    var content;

    if (user.role === "Student") {
      content = (
        <div>
          <form onSubmit={this.onSubmit}>
            <label htmlFor="firstname">* Firstname:</label>
            <TextFieldGroup
              placeholder="* Firstname"
              onChange={this.onChange}
              value={this.state.firstname}
              name="firstname"
              error={errors.firstname}
            />
            <label htmlFor="lastname">* Lastname:</label>
            <TextFieldGroup
              placeholder="* Lastname"
              onChange={this.onChange}
              value={this.state.lastname}
              name="lastname"
              error={errors.lastname}
            />
            <label htmlFor="birthplace">* Gender:</label>
            <SelectListGroup
              placeholder="* Gender"
              onChange={this.onChange}
              value={this.state.gender}
              name="gender"
              error={errors.gender}
              options={statusOptions}
            />
            <label htmlFor="birthday">* Birthday:</label>
            <TextFieldGroup
              type={"date"}
              placeholder="* Birthday"
              onChange={this.onChange}
              value={moment.utc(this.state.birthday).format("MM-dd-yyyy")}
              name="birthday"
              error={errors.birthday}
            />
            <label htmlFor="birthplace">* Birthplace:</label>
            <TextFieldGroup
              placeholder="* Birthplace"
              onChange={this.onChange}
              value={this.state.birthplace}
              name="birthplace"
              error={errors.birthplace}
            />
            <label htmlFor="countryofbirth">* Country of Birth:</label>
            <SelectListGroup
              placeholder="* Country of Birth"
              onChange={this.onChange}
              value={this.state.countryofbirth}
              name="countryofbirth"
              error={errors.countryofbirth}
              options={countryOptions}
            />
            <label htmlFor="nationality">* Nationality:</label>
            <SelectListGroup
              placeholder="* Nationality"
              onChange={this.onChange}
              value={this.state.nationality}
              name="nationality"
              error={errors.nationality}
              options={countryOptions}
            />
            <label htmlFor="nationality2">Second Nationality:</label>
            <SelectListGroup
              placeholder="Second Nationality"
              onChange={this.onChange}
              value={this.state.nationality2}
              name="nationality2"
              error={errors.nationality2}
              options={countryOptions}
              info="Please provide your second nationality if you have one"
            />
            {aufenthaltLabel}
            {aufenthaltInput}

            <div className="container">
              <div className="row">
                <label htmlFor="Stipendium">
                  End of scholarship (if applicable):
                </label>
                <div className={"col-md-5"}></div>
                <div className={"col-md-3"}>
                  <button
                    className={"btn btn-light"}
                    type="button"
                    onClick={() => {
                      this.setState({
                        stipendiumend: "",
                      });
                    }}
                  >
                    {" "}
                    Empty Date
                  </button>
                </div>
              </div>
            </div>

            <TextFieldGroup
              type={"date"}
              placeholder="Stipendium End"
              onChange={this.onChange}
              value={moment.utc(this.state.stipendiumend).format("MM-dd-yyyy")}
              name="stipendiumend"
              error={errors.stipendiumend}
            />

            <label htmlFor="Matrikelnummer">Immatrikulation number:</label>
            <TextFieldGroup
              placeholder="Immatrikulation number"
              onChange={this.onChange}
              value={this.state.matrikelnummer}
              name="matrikelnummer"
              error={errors.matrikelnummer}
            />
            <label htmlFor="CurrentFieldofStudy">Current Field of Study:</label>
            <TextFieldGroup
              placeholder="Current Field of Study"
              onChange={this.onChange}
              value={this.state.currentfieldofstudy}
              name="currentfieldofstudy"
              error={errors.currentfieldofstudy}
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
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="receivemails"
                onChange={() => {
                  this.setState((prevState) => ({
                    receivemails: !prevState.receivemails,
                  }));
                }}
                checked={this.state.receivemails}
                value={this.state.receivemails}
              />
              <label className="form-check-label" htmlFor="receivemails">
                reveive emails directed to all students
              </label>
            </div>

            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          </form>
          <hr />
          <button
            onClick={this.onDeleteClick.bind(this)}
            className="btn btn-danger"
          >
            {" "}
            Delete My Account
          </button>
        </div>
      );
    } else {
      content = (
        <form onSubmit={this.onSubmit}>
          <label htmlFor="firstname">* Firstname:</label>
          <TextFieldGroup
            placeholder="* Firstname"
            onChange={this.onChange}
            value={this.state.firstname}
            name="firstname"
            error={errors.firstname}
          />
          <label htmlFor="lastname">* Lastname:</label>
          <TextFieldGroup
            placeholder="* Lastname"
            onChange={this.onChange}
            value={this.state.lastname}
            name="lastname"
            error={errors.lastname}
          />
          <label htmlFor="birthplace">* Gender:</label>
          <SelectListGroup
            placeholder="* Gender"
            onChange={this.onChange}
            value={this.state.gender}
            name="gender"
            error={errors.gender}
            options={statusOptions}
          />
          <label htmlFor="handle">* Handle:</label>
          <TextFieldGroup
            placeholder="* Handle"
            onChange={this.onChange}
            value={this.state.handle}
            name="handle"
            error={errors.handle}
            info={"Select a unique 2 to 3 character handle"}
          />
          <input
            type="submit"
            value="Submit"
            className="btn btn-info btn-block mt-4"
          />
        </form>
      );
    }

    return (
      <div className={"create-profile"}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/dashboard"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>

              <small className="d-block pb-3">* = required fields</small>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  deleteAccount,
})(withRouter(CreateProfile));
