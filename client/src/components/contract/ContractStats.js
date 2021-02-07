import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { getContracts } from "../../actions/contractActions";
import { getSemesters } from "../../actions/semesterActions";
import moment from "moment";

class ContractStats extends Component {
  componentDidMount() {
    this.props.getContracts();
    this.props.getSemesters();
  }

  render() {
    var contracts;

    if (this.props.contract) {
      contracts = this.props.contract.contracts;
    }

    //Data for Table
    const entries = contracts ? contracts : [];
    var signable = 0;
    var incomplete = 0;
    var inProcess = 0;
    var completed = 0;
    var overall = 0;

    var newArray = entries.forEach((el) => {
      if (el.status === "Signable") {
        return (signable += 1);
      } else if (el.status === "Incomplete") {
        return (incomplete += 1);
      } else if (el.status === "In Process") {
        return (inProcess += 1);
      } else if (el.status === "Completed") {
        return (completed += 1);
      }
    });

    overall = signable + incomplete + inProcess + completed;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to={"/contracts"} className={"btn btn-light"}>
              back
            </Link>
            <h1 className="display-4 text-center">Vertragsstatistiken</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Datum</th>
                  <th scope="col">Unvollständig</th>
                  <th scope="col">In Bearbeitung</th>
                  <th scope="col">Unterschriftsbereit</th>
                  <th scope="col">Abgeschlossen</th>
                  <th scope="col">Gesamt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{moment.utc(Date.now()).format("DD.MM.YYYY")}</td>

                  <td>{incomplete}</td>
                  <td>{inProcess}</td>
                  <td>{signable}</td>
                  <td>{completed}</td>
                  <td>{overall}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

ContractStats.propTypes = {
  application: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
  course: state.course,
  contract: state.contract,
});

export default connect(mapStateToProps, { getContracts, getSemesters })(
  ContractStats
);
