import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import {
  createRental,
  getRentalsapplicationOfId,
} from "../../actions/rentalActions";
import { getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateRentalFromApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      vorname: "",
      tumid: "",
      email: "",
      strasse: "",
      plz: "",
      ort: "",
      telefonnummer: "",
      veranstaltung: "",
      von: "",
      bis: "",
      betreuer: "",
      angeschrieben: "",
      rückmeldung: "",
      leihscheinverschickt: "",
      rückgabe: "",
      ipad: false,
      mikrofon: false,
      wacom: false,
      webcam: false,
      stativ: false,
      details: "",
      status: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.rentals.rentalapplication) {
      var { rentalapplication } = nextProps.rentals;

      rentalapplication.profile.lastname = !isEmpty(
        rentalapplication.profile.lastname
      )
        ? rentalapplication.profile.lastname
        : "";

      rentalapplication.profile.firstname = !isEmpty(
        rentalapplication.profile.firstname
      )
        ? rentalapplication.profile.firstname
        : "";

      rentalapplication.tumid = !isEmpty(rentalapplication.tumid)
        ? rentalapplication.tumid
        : "";

      rentalapplication.email = !isEmpty(rentalapplication.email)
        ? rentalapplication.email
        : "";

      if (!rentalapplication.adresse) {
        rentalapplication.adresse = {};
      }
      rentalapplication.adresse.strasse = !isEmpty(
        rentalapplication.adresse.strasse
      )
        ? rentalapplication.adresse.strasse
        : "";

      rentalapplication.adresse.plz = !isEmpty(rentalapplication.adresse.plz)
        ? rentalapplication.adresse.plz
        : "";

      rentalapplication.adresse.ort = !isEmpty(rentalapplication.adresse.ort)
        ? rentalapplication.adresse.ort
        : "";

      rentalapplication.telefonnummer = !isEmpty(
        rentalapplication.telefonnummer
      )
        ? rentalapplication.telefonnummer
        : "";

      //Leihgerätefelder
      if (!rentalapplication.leihobjekt) {
        rentalapplication.leihobjekt = {};
      }

      rentalapplication.leihobjekt.ipad = !isEmpty(
        rentalapplication.leihobjekt.ipad
      )
        ? rentalapplication.leihobjekt.ipad
        : false;

      rentalapplication.leihobjekt.mikrofon = !isEmpty(
        rentalapplication.leihobjekt.mikrofon
      )
        ? rentalapplication.leihobjekt.mikrofon
        : false;

      rentalapplication.leihobjekt.wacom = !isEmpty(
        rentalapplication.leihobjekt.wacom
      )
        ? rentalapplication.leihobjekt.wacom
        : false;

      rentalapplication.leihobjekt.webcam = !isEmpty(
        rentalapplication.leihobjekt.webcam
      )
        ? rentalapplication.leihobjekt.webcam
        : false;

      rentalapplication.leihobjekt.stativ = !isEmpty(
        rentalapplication.leihobjekt.stativ
      )
        ? rentalapplication.leihobjekt.stativ
        : false;

      this.setState({
        name: rentalapplication.profile.lastname,
        vorname: rentalapplication.profile.firstname,
        tumid: rentalapplication.tumid,
        email: rentalapplication.email,
        strasse: rentalapplication.adresse.strasse,
        plz: rentalapplication.adresse.plz,
        ort: rentalapplication.adresse.ort,
        telefonnummer: rentalapplication.telefonnummer,
        ipad: rentalapplication.leihobjekt.ipad,
        mikrofon: rentalapplication.leihobjekt.mikrofon,
        wacom: rentalapplication.leihobjekt.wacom,
        webcam: rentalapplication.leihobjekt.webcam,
        stativ: rentalapplication.leihobjekt.stativ,
      });
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getRentalsapplicationOfId(this.props.match.params.id);
  }

  onSubmit(e) {
    e.preventDefault();

    const rentalData = {
      name: this.state.name,
      vorname: this.state.vorname,
      tumid: this.state.tumid,
      email: this.state.email,
      strasse: this.state.strasse,
      plz: this.state.plz,
      ort: this.state.ort,
      telefonnummer: this.state.telefonnummer,
      veranstaltung: this.state.veranstaltung,
      von: this.state.von,
      bis: this.state.bis,
      betreuer: this.state.betreuer,
      angeschrieben: this.state.angeschrieben,
      rückmeldung: this.state.rückmeldung,
      leihscheinverschickt: this.state.leihscheinverschickt,
      rückgabe: this.state.rückgabe,
      ipad: this.state.ipad,
      mikrofon: this.state.mikrofon,
      wacom: this.state.wacom,
      webcam: this.state.webcam,
      stativ: this.state.stativ,
      details: this.state.details,
      status: this.state.status,
      handle: this.props.profile.profile.handle,
      fromapp: true,
      appid: this.props.match.params.id,
    };

    this.props.createRental(rentalData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    console.log(this.state.mikrofon);
    const errors = this.state.errors;

    const statusOptions = [
      { label: "Unvollständig", value: "Unvollständig" },
      { label: "LS verschickt", value: "Vollständig" },
      { label: "HW ausgegeben", value: "Aktiv" },
      { label: "Abgeschlossen", value: "Abgeschlossen" },
    ];

    return (
      <div className={"create-rental"}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/rentalapplications"} className={"btn btn-light"}>
                zurück
              </Link>
              <h1 className="display-4 text-center">Neue Ausleihe</h1>
              <small className="d-block pb-3">* = Pflichtfelder</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Nachname"
                  onChange={this.onChange}
                  value={this.state.name}
                  name="name"
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="* Vorname"
                  onChange={this.onChange}
                  value={this.state.vorname}
                  name="vorname"
                  error={errors.vorname}
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
                <h6>Anschrift</h6>
                <TextFieldGroup
                  placeholder="Straße"
                  onChange={this.onChange}
                  value={this.state.strasse}
                  name="strasse"
                  error={errors.strasse}
                />
                <TextFieldGroup
                  placeholder="Postleitzahl"
                  onChange={this.onChange}
                  value={this.state.plz}
                  name="plz"
                  error={errors.plz}
                />
                <TextFieldGroup
                  placeholder="Ort"
                  onChange={this.onChange}
                  value={this.state.ort}
                  name="ort"
                  error={errors.ort}
                />
                <TextFieldGroup
                  placeholder="Telefonnummer"
                  onChange={this.onChange}
                  value={this.state.telefonnummer}
                  name="telefonnummer"
                  error={errors.telefonnummer}
                />
                <TextFieldGroup
                  placeholder="Veranstaltung"
                  onChange={this.onChange}
                  value={this.state.veranstaltung}
                  name="veranstaltung"
                  error={errors.veranstaltung}
                />
                <h6>Vertragslaufzeit von:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={this.state.von}
                  name={"von"}
                  error={errors.von}
                />
                <h6>bis:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={this.state.bis}
                  name={"bis"}
                  error={errors.bis}
                />
                <TextFieldGroup
                  placeholder="Betreuer"
                  onChange={this.onChange}
                  value={this.state.betreuer}
                  name="betreuer"
                  error={errors.betreuer}
                />
                <h6>Angeschrieben am:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={this.state.angeschrieben}
                  name={"angeschrieben"}
                  error={errors.angeschrieben}
                />
                <h6>Rückmeldung erhalten am:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={this.state.rückmeldung}
                  name={"rückmeldung"}
                  error={errors.rückmeldung}
                />

                <h6>Leihschein verschickt am:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={this.state.leihscheinverschickt}
                  name={"leihscheinverschickt"}
                  error={errors.leihscheinverschickt}
                />

                <h6>Vorraussichtliche Rückgabe:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={this.state.rückgabe}
                  name={"rückgabe"}
                  error={errors.rückgabe}
                />
                <h6>Leihgeräte</h6>
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
                      checked={this.state.ipad}
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
                      checked={this.state.mikrofon}
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
                      checked={this.state.wacom}
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
                      checked={this.state.webcam}
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
                      checked={this.state.stativ}
                    />
                    <label className="form-check-label" htmlFor="stativ">
                      Mikrofonstativ
                    </label>
                  </div>
                </div>

                <TextAreaFieldGroup
                  placeholder="Bemerkungen"
                  onChange={this.onChange}
                  value={this.state.details}
                  name="details"
                  error={errors.details}
                />

                <SelectListGroup
                  placeholder="* Status"
                  onChange={this.onChange}
                  value={this.state.status}
                  name="status"
                  error={errors.status}
                  options={statusOptions}
                  info={"Status der Leihe"}
                />

                <input
                  type="submit"
                  value="Bestätigen"
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

CreateRentalFromApplication.propTypes = {
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
  createRental,
  getCurrentProfile,
  getRentalsapplicationOfId,
})(withRouter(CreateRentalFromApplication));
