import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getContractOfID } from "../../actions/contractActions";
import { getCurrentProfile } from "../../actions/profileActions";
import { downloadPdf } from "../../actions/formsActions";

class ViewContract extends Component {
  componentDidMount() {
    this.props.getContractOfID(this.props.match.params.id);
    this.props.getCurrentProfile();
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
            <td>{contractdata.immatrikulationsbescheinigung2}</td>
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
                  <td>{contractdata.merkblatt}</td>
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
                    contractdata.einstellungsvorschlag === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Einstellungsvorschlag</th>
                  <td>{contractdata.einstellungsvorschlag}</td>
                  <td>
                    {/*<button*/}
                    {/*  type="button"*/}
                    {/*  onClick={this.onDownloadClick.bind(*/}
                    {/*    this,*/}
                    {/*    "Einstellungsvorschlag"*/}
                    {/*  )}*/}
                    {/*  className="btn btn-info"*/}
                    {/*>*/}
                    {/*  Download*/}
                    {/*</button>*/}
                  </td>
                </tr>
                <tr
                  className={`${
                    contractdata.versicherungspflicht === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Feststellung der Versicherungspflicht</th>
                  <td>{contractdata.versicherungspflicht}</td>
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
                  <td>{contractdata.scientology}</td>
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
                  <td>{contractdata.verfassungstreue}</td>
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
                <tr
                  className={`${
                    contractdata.immatrikulationsbescheinigung === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Immatrikulationsbescheinigung</th>
                  <td>{contractdata.immatrikulationsbescheinigung}</td>
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
                  <td>{contractdata.aufenthaltstitel}</td>
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
                  <td>{contractdata.krankenkassenbescheinigung}</td>
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
                  <td>{contractdata.personalbogenbezuegestelle}</td>
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
                  <td>{contractdata.personalbogenstudierende}</td>
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
                  <td>{contractdata.steuerId}</td>
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
                  <td>{contractdata.reisepass}</td>
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
                  <td>{contractdata.stipendium}</td>
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
                  <td>{contractdata.abschlusszeugnis}</td>
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
