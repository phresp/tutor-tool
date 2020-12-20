import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getContractOfID } from "../../actions/contractActions";

class ViewContract extends Component {
  componentDidMount() {
    this.props.getContractOfID(this.props.match.params.id);
  }

  render() {
    var contractdata = {};
    if (this.props.contract.contract) {
      contractdata = this.props.contract.contract;
    }
    var coursename = "";
    var coursesem = "";
    if (this.props.contract.contract) {
      coursename = this.props.contract.contract.course.metacourse.name;
      coursesem = this.props.contract.contract.course.semester.name;
    }

    return (
      <div className="container-fluid">
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
                  <td></td>
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
                  <td></td>
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
                  <td></td>
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
                  <td></td>
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
                  <td></td>
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
                  <td></td>
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
                  <td></td>
                </tr>
                <tr
                  className={`${
                    contractdata.sozialversicherungsausweis === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">Sozialversicherungsausweis</th>
                  <td>{contractdata.sozialversicherungsausweis}</td>
                  <td></td>
                </tr>
                <tr
                  className={`${
                    contractdata.steuerId === "Fehlt"
                      ? "table-danger"
                      : "table-success"
                  }`}
                >
                  <th scope="row">
                    Steuer-ID-Nummer: Kopie einer Bescheinigung vom Finanzam
                  </th>
                  <td>{contractdata.steuerId}</td>
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
};

const mapStateToProps = (state) => ({
  contract: state.contract,
});

export default connect(mapStateToProps, { getContractOfID })(
  withRouter(ViewContract)
);
