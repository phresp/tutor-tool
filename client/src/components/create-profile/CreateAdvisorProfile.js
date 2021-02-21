import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import countryList from "react-select-country-list";

import { createAdvisorProfile } from "../../actions/profileActions";

class CreateAdvisorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      firstname: "",
      gender: "",
      handle: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {}

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
      handle: this.state.handle,
    };
    this.props.createAdvisorProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
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
                <label htmlFor="gender">* Gender:</label>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateAdvisorProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createAdvisorProfile })(
  withRouter(CreateAdvisorProfile)
);
