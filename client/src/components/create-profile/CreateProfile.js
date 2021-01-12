import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import countryList from "react-select-country-list";

import { createProfile } from "../../actions/profileActions";

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
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    countryList().setEmpty("Select a Country").getLabel("");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    var countryOptions = countryList().getData();

    const { errors } = this.state;

    //Select options for gender
    const statusOptions = [
      { label: "Select your gender", value: "" },
      { label: "male", value: "male" },
      { label: "female", value: "female" },
      { label: "divers", value: "divers" },
    ];
    return (
      <div className={"create-profile"}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Firstname"
                  onChange={this.onChange}
                  value={this.state.firstname}
                  name="firstname"
                  error={errors.firstname}
                />
                <TextFieldGroup
                  placeholder="* Lastname"
                  onChange={this.onChange}
                  value={this.state.lastname}
                  name="lastname"
                  error={errors.lastname}
                />
                <SelectListGroup
                  placeholder="* Gender"
                  onChange={this.onChange}
                  value={this.state.gender}
                  name="gender"
                  error={errors.gender}
                  options={statusOptions}
                />
                <TextFieldGroup
                  type={"date"}
                  placeholder="* Birthday"
                  onChange={this.onChange}
                  value={this.state.birthday}
                  name="birthday"
                  error={errors.birthday}
                />
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
                <TextFieldGroup
                  placeholder="* Matrikelnummer"
                  onChange={this.onChange}
                  value={this.state.matrikelnummer}
                  name="matrikelnummer"
                  error={errors.matrikelnummer}
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
