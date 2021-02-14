import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { getContracts } from "../../actions/contractActions";
import { getSemesters } from "../../actions/semesterActions";
import moment from "moment";
import SelectListGroup from "../common/SelectListGroup";
import { SemesterContractDataExport } from "../../actions/formsActions";

class ContractStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semesters: "",
      semester: "",
      semesterdata: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getContracts();
    this.props.getSemesters();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.semester) {
      const { semesters } = nextProps.semester;
      this.setState({
        semesters: semesters,
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDownloadClick(e) {
    e.preventDefault();
    this.props.SemesterContractDataExport(this.state.semesterdata);
  }

  render() {
    var { semesters } = this.state;
    //Select options for semester
    if (!semesters) {
      semesters = [];
    }
    const semesterOptions = semesters.map((el) => {
      return { label: el.name, value: el._id };
    });
    semesterOptions.unshift({ label: "Semester", value: "" });

    this.state.semesterdata = semesterOptions.filter(
      (el) => el.value === this.state.semester
    );
    //Get Contract Stats
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

    var newEntries = entries.filter((el) => {
      if (el.course.semester._id === this.state.semester) return true;
    });

    var newArray = newEntries.forEach((el) => {
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
            <div className="col-md-3">
              <label htmlFor="inputSemester">Semester</label>
              <SelectListGroup
                placeholder="Semester"
                onChange={this.onChange}
                value={this.state.semester}
                name="semester"
                options={semesterOptions}
              />
            </div>
            <button
              type="button"
              onClick={this.onDownloadClick.bind(this)}
              className="btn btn-primary"
            >
              Export Contractdata of Semester
            </button>

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
  semester: PropTypes.object.isRequired,
  contract: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  semester: state.semester,
  contract: state.contract,
});

export default connect(mapStateToProps, {
  getContracts,
  getSemesters,
  SemesterContractDataExport,
})(ContractStats);
