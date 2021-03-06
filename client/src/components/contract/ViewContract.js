import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getContractOfID } from "../../actions/contractActions";
import { getCurrentProfile } from "../../actions/profileActions";
import { downloadPdf } from "../../actions/formsActions";
import isEmpty from "../../validation/is-empty";
import moment from "moment";

class ViewContract extends Component {
  componentDidMount() {
    this.props.getContractOfID(this.props.match.params.id);
    this.props.getCurrentProfile();
  }

  constructor(props) {
    super(props);
    this.state = {
      contractstart: "",
      contractstart2: "",
      contractend: "",
      contractend2: "",
      hours: "",
      hours2: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.contract.contract) {
      console.log(nextProps.contract.contract);
      const contract = nextProps.contract.contract;

      //If contract field doesn't exist, make empty string
      contract.contractstart = !isEmpty(contract.contractstart)
        ? contract.contractstart
        : "";
      contract.contractstart2 = !isEmpty(contract.contractstart2)
        ? contract.contractstart2
        : "";
      contract.contractend = !isEmpty(contract.contractend)
        ? contract.contractend
        : "";
      contract.contractend2 = !isEmpty(contract.contractend2)
        ? contract.contractend2
        : "";
      contract.hours = !isEmpty(contract.hours) ? contract.hours : "";
      contract.hours2 = !isEmpty(contract.hours2) ? contract.hours2 : "";

      //Set component fields state
      this.setState({
        contractstart: contract.contractstart,
        contractstart2: contract.contractstart2,
        contractend: contract.contractend,
        contractend2: contract.contractend2,
        hours: contract.hours,
        hours2: contract.hours2,
      });
    }
  }

  onDownloadClick(name) {
    const formData = {
      name: name,
    };
    this.props.downloadPdf(formData);
  }

  render() {
    var contractdata = {};
    if (this.props.contract.contract) {
      contractdata = this.props.contract.contract;
    }

    var contractdata1 = (
      <div>
        <h5>Main Contract</h5>
        <p className="lead text-muted">
          Contractstart: {moment(this.state.contractstart).format("DD/MM/YYYY")}
        </p>
        <p className="lead text-muted">
          Contractend: {moment(this.state.contractend).format("DD/MM/YYYY")}
        </p>
        <p className="lead text-muted">Weekly Hours: {this.state.hours} </p>
      </div>
    );

    var contractdata2;
    if (this.state.contractstart2) {
      var contractdata2 = (
        <div>
          <h5>Secondary Contract</h5>
          <h6>
            This is an additional (splitted) contract if there are changes
            during the occupation
          </h6>
          <p className="lead text-muted">
            Contractstart:{" "}
            {moment(this.state.contractstart2).format("DD/MM/YYYY")}
          </p>
          <p className="lead text-muted">
            Contractend: {moment(this.state.contractend2).format("DD/MM/YYYY")}
          </p>
          <p className="lead text-muted">Weekly Hours: {this.state.hours2} </p>
        </div>
      );
    }

    const englishFormatter = (ele) => {
      if (ele === "Fehlt") {
        return "Missing";
      } else if (ele === "Liegt vor" || ele === "Liegt bei") {
        return "Already filed";
      } else if (ele === "Bereits Vorhanden") {
        return "Already available";
      } else if (ele === "Kein Bedarf") {
        return "Not necessary";
      } else {
        return ele;
      }
    };

    var coursename = "";
    var coursesem = "";
    var immatrikulation2row;
    if (this.props.contract.contract) {
      coursename = this.props.contract.contract.course.metacourse.name;
      coursesem = this.props.contract.contract.course.semester.name;

      if (this.props.contract.contract.immatrikulationsbescheinigung2) {
        immatrikulation2row = (
          <tr
            className={`${
              contractdata.immatrikulationsbescheinigung2 === "Fehlt"
                ? "table-danger"
                : "table-success"
            }`}
          >
            <th scope="row">Immatrikulationsbescheinigung next semester</th>
            <td>
              {englishFormatter(contractdata.immatrikulationsbescheinigung2)}
            </td>
            <td></td>
          </tr>
        );
      }
    }

    var immatrikulation0row;
    if (this.props.contract.contract) {
      coursename = this.props.contract.contract.course.metacourse.name;
      coursesem = this.props.contract.contract.course.semester.name;

      if (this.props.contract.contract.immatrikulationsbescheinigung0) {
        immatrikulation0row = (
          <tr
            className={`${
              contractdata.immatrikulationsbescheinigung0 === "Fehlt"
                ? "table-danger"
                : "table-success"
            }`}
          >
            <th scope="row">Immatrikulationsbescheinigung previous semester</th>
            <td>
              {englishFormatter(contractdata.immatrikulationsbescheinigung0)}
            </td>
            <td></td>
          </tr>
        );
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to={"/mycontracts"} className={"btn btn-light"}>
              back
            </Link>

            <h1 className="display-4 text-center">
              Contract for {coursename}, {coursesem}
            </h1>
            {contractdata1}
            {contractdata2}
            <h4 className={"text-center"}>
              Please hand in the following missing documents
            </h4>
            <h6 className={"text-center"}>
              * this document has to be sent in as original via postal services
            </h6>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Form</th>
                  <th scope="col">Received</th>
                  <th scope="col">Download</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className={`${
                    contractdata.merkblatt === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Merkblatt Tutorbetrieb</th>
                  <td>{englishFormatter(contractdata.merkblatt)}</td>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(
                        this,
                        "MerkblattTutorbetrieb"
                      )}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                </tr>
                <tr
                  className={`${
                    contractdata.versicherungspflicht === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">* Feststellung der Versicherungspflicht</th>
                  <td>{englishFormatter(contractdata.versicherungspflicht)}</td>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(
                        this,
                        "Versicherungspflicht"
                      )}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                </tr>
                <tr
                  className={`${
                    contractdata.scientology === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Fragebogen zu Scientology</th>
                  <td>{englishFormatter(contractdata.scientology)}</td>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(this, "Scientology")}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                </tr>
                <tr
                  className={`${
                    contractdata.verfassungstreue === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Fragebogen zur Verfassungstreue</th>
                  <td>{englishFormatter(contractdata.verfassungstreue)}</td>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(
                        this,
                        "Verfassungstreue"
                      )}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                </tr>
                {immatrikulation0row}
                <tr
                  className={`${
                    contractdata.immatrikulationsbescheinigung === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Immatrikulationsbescheinigung</th>
                  <td>
                    {englishFormatter(
                      contractdata.immatrikulationsbescheinigung
                    )}
                  </td>
                  <td></td>
                </tr>
                {immatrikulation2row}

                <tr
                  className={`${
                    contractdata.aufenthaltstitel === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">
                    Kopie gültiger Aufenthaltstitel mit Erlaubnis zur
                    Arbeitsaufnahme
                  </th>
                  <td>{englishFormatter(contractdata.aufenthaltstitel)}</td>
                  <td></td>
                </tr>
                <tr
                  className={`${
                    contractdata.reisepass === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Reisepass</th>
                  <td>{englishFormatter(contractdata.reisepass)}</td>
                  <td></td>
                </tr>
                <tr
                  className={`${
                    contractdata.krankenkassenbescheinigung === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Krankenkassenbescheinigung</th>
                  <td>
                    {englishFormatter(contractdata.krankenkassenbescheinigung)}
                  </td>
                  <td></td>
                </tr>
                <tr
                  className={`${
                    contractdata.personalbogenbezuegestelle === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Personalbogen Bezuegestelle</th>
                  <td>
                    {englishFormatter(contractdata.personalbogenbezuegestelle)}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(
                        this,
                        "PersonalbogenBezuegestelle"
                      )}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                </tr>
                <tr
                  className={`${
                    contractdata.personalbogenstudierende === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Personalbogen Studierende</th>
                  <td>
                    {englishFormatter(contractdata.personalbogenstudierende)}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(
                        this,
                        "PersonalbogenStudierende"
                      )}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                </tr>
                <tr
                  className={`${
                    contractdata.steuerId === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">
                    Steuer-ID-Nummer: Kopie einer Bescheinigung vom Finanzamt
                  </th>
                  <td>{englishFormatter(contractdata.steuerId)}</td>
                  <td></td>
                </tr>

                <tr
                  className={`${
                    contractdata.stipendium === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Stipendiumsbescheinigung</th>
                  <td>{englishFormatter(contractdata.stipendium)}</td>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(
                        this,
                        "Stipendiumsbescheinigung"
                      )}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                </tr>

                <tr
                  className={`${
                    contractdata.abschlusszeugnis === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Abschlusszeugnis</th>
                  <td>{englishFormatter(contractdata.abschlusszeugnis)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

ViewContract.propTypes = {
  getContractOfID: PropTypes.func.isRequired,
  contract: PropTypes.object.isRequired,
  downloadPdf: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contract: state.contract,
});

export default connect(mapStateToProps, {
  getContractOfID,
  downloadPdf,
  getCurrentProfile,
})(withRouter(ViewContract));
