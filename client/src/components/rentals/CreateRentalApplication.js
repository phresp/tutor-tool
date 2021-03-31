import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { getCurrentProfile } from "../../actions/profileActions";
import { createRentalApplication } from "../../actions/rentalActions";

class CreateRentalApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      vorname: "",
      tumid: "",
      email: "",
      profile: "",
      strasse: "",
      plz: "",
      ort: "",
      telefonnummer: "",
      ipad: false,
      mikrofon: false,
      wacom: false,
      webcam: false,
      stativ: false,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      this.setState({
        name: nextProps.profile.profile.lastname,
        vorname: nextProps.profile.profile.firstname,
        email: nextProps.profile.profile.user.email,
        profile: nextProps.profile.profile._id,
      });
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onSubmit(e) {
    e.preventDefault();

    const rentalapplicationData = {
      profile: this.state.profile,
      lastname: this.state.name,
      firstname: this.state.vorname,
      tumid: this.state.tumid,
      email: this.state.email,
      strasse: this.state.strasse,
      plz: this.state.plz,
      ort: this.state.ort,
      telefonnummer: this.state.telefonnummer,
      veranstaltung: this.state.veranstaltung,
      ipad: this.state.ipad,
      mikrofon: this.state.mikrofon,
      wacom: this.state.wacom,
      webcam: this.state.webcam,
      stativ: this.state.stativ,
    };

    this.props.createRentalApplication(
      rentalapplicationData,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const errors = this.state.errors;

    return (
      <div className={"create-rental"}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/dashboard"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">New Rental Application</h1>
              <small className="d-block pb-3">* = necessary fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Firstname"
                  onChange={this.onChange}
                  value={this.state.vorname}
                  name="vorname"
                  error={errors.vorname}
                />
                <TextFieldGroup
                  placeholder="Lastname"
                  onChange={this.onChange}
                  value={this.state.name}
                  name="name"
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Tum-ID"
                  onChange={this.onChange}
                  value={this.state.tumid}
                  name="tumid"
                  error={errors.tumid}
                />
                <TextFieldGroup
                  placeholder="Email"
                  onChange={this.onChange}
                  value={this.state.email}
                  name="email"
                  error={errors.email}
                />
                <h6>Address</h6>
                <TextFieldGroup
                  placeholder="Street"
                  onChange={this.onChange}
                  value={this.state.strasse}
                  name="strasse"
                  error={errors.strasse}
                />
                <TextFieldGroup
                  placeholder="City Code"
                  onChange={this.onChange}
                  value={this.state.plz}
                  name="plz"
                  error={errors.plz}
                />
                <TextFieldGroup
                  placeholder="City"
                  onChange={this.onChange}
                  value={this.state.ort}
                  name="ort"
                  error={errors.ort}
                />
                <TextFieldGroup
                  placeholder="Telefonenumber"
                  onChange={this.onChange}
                  value={this.state.telefonnummer}
                  name="telefonnummer"
                  error={errors.telefonnummer}
                />
                <h6>Devices</h6>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="ipad"
                      onChange={() => {
                        this.setState((prevState) => ({
                          ipad: !prevState.ipad,
                        }));
                      }}
                      value={this.state.ipad}
                    />
                    <label className="form-check-label" htmlFor="ipad">
                      iPad Pro
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mikrofon"
                      onChange={() => {
                        this.setState((prevState) => ({
                          mikrofon: !prevState.mikrofon,
                        }));
                      }}
                      value={this.state.mikrofon}
                    />
                    <label className="form-check-label" htmlFor="mikrofon">
                      Mikrofon
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="wacom"
                      onChange={() => {
                        this.setState((prevState) => ({
                          wacom: !prevState.wacom,
                        }));
                      }}
                      value={this.state.wacom}
                    />
                    <label className="form-check-label" htmlFor="wacom">
                      Wacom Tablet
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="webcam"
                      onChange={() => {
                        this.setState((prevState) => ({
                          webcam: !prevState.webcam,
                        }));
                      }}
                      value={this.state.webcam}
                    />
                    <label className="form-check-label" htmlFor="webcam">
                      Webcam
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="stativ"
                      onChange={() => {
                        this.setState((prevState) => ({
                          stativ: !prevState.stativ,
                        }));
                      }}
                      value={this.state.stativ}
                    />
                    <label className="form-check-label" htmlFor="stativ">
                      Mikrofonstativ
                    </label>
                  </div>
                </div>
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

CreateRentalApplication.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  rentals: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  rentals: state.rentals,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  createRentalApplication,
})(withRouter(CreateRentalApplication));
