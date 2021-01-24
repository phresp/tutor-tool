import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import moment from "moment";
import verfassungsPruefung from "../common/VerfassungschutzCountries";

import { updateAccount, getProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import countryList from "react-select-country-list";

class ChangeAccountType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      firstname: "",
      role: "",
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
      if (profile.user.role) {
        profile.user.role = !isEmpty(profile.user.role)
          ? profile.user.role
          : "";
      }
      //Set component fields state
      this.setState({
        lastname: profile.lastname,
        firstname: profile.firstname,

        role: profile.user.role,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const accountData = {
      userID: this.props.profile.profile.user._id,
      role: this.state.role,
    };
    this.props.updateAccount(accountData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const accountTypeOptions = [
      { label: "Student", value: "Student" },
      { label: "Admin", value: "Admin" },
      { label: "Übungsleiter", value: "Advisor" },
      { label: "RBG", value: "RBG" },
    ];
    return (
      <div className={"create-profile"}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/profile/${this.props.match.params.id}`}
                className={"btn btn-light"}
              >
                back
              </Link>
              <h1 className="display-4 text-center">
                Change Account Type for <br />
                {this.state.firstname} {this.state.lastname}{" "}
              </h1>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="accounttype">Account Type:</label>
                <SelectListGroup
                  placeholder="Account Type"
                  onChange={this.onChange}
                  value={this.state.role}
                  name="role"
                  options={accountTypeOptions}
                  info="Account Type auswählen"
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

ChangeAccountType.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { updateAccount, getProfile })(
  withRouter(ChangeAccountType)
);
