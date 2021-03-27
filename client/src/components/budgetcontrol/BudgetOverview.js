import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getCourses } from "../../actions/courseActions";
import { getSemesters } from "../../actions/semesterActions";
import { getContracts } from "../../actions/contractActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";

import { TutorAdminDataExport } from "../../actions/formsActions";
import SelectListGroup from "../common/SelectListGroup";

const { SearchBar } = Search;

class BudgetOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fil: "0",
      semesters: "",
      semester: "",
      contracts: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.props.getCourses();
    this.props.getSemesters();
    this.props.getContracts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.semester) {
      const { semesters } = nextProps.semester;
      this.setState({
        semesters: semesters,
      });
    }

    if (nextProps.contract) {
      const { contracts } = nextProps.contract;
      this.setState({
        contracts: contracts,
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { courses } = this.props.course;
    var { semesters, contracts, errors } = this.state;
    const entries = courses ? courses : [];

    //Select options for semester
    if (!semesters) {
      semesters = [];
    }
    const semesterOptions = semesters.map((el) => {
      return { label: el.name, value: el._id };
    });
    semesterOptions.unshift({ label: "Semester auswählen", value: "" });

    const defaultSorted = [
      {
        dataField: "status",
        order: "desc",
      },
    ];

    var courseArray = entries.filter((el) => {
      if (this.state.semester === el.semester[0]._id) return el;
    });

    const diff_weeks = (dt2, dt1) => {
      var diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60 * 60 * 24 * 7;
      return Math.abs(Math.round(diff));
    };

    const numberApplications = (cell, row, rowIndex, formatExtraData) => {
      if (row.applications) {
        return row.applications.length;
      }
    };

    const numberAccepted = (cell, row, rowIndex, formatExtraData) => {
      if (row.applications) {
        return row.applications.filter((x) => x.status == "Accepted").length;
      }
    };

    const numberVertrag = (cell, row, rowIndex, formatExtraData) => {
      var counter = 0;
      contracts.forEach((e) => {
        if (e.course._id === row._id) {
          counter += 1;
        }
      });
      return counter;
    };

    const courseFormatter = (value, row, rowIndex, formatExtraData) => {
      return (
        <Link to={`/course-applications/${row._id}`} className={"text"}>
          {value}
        </Link>
      );
    };

    const columns = [
      {
        dataField: "metacourse[0].name",
        text: "Veranstaltung",
        sort: true,
        formatter: courseFormatter,
      },
      {
        text: "Anzahl Verträge",
        sort: true,
        formatter: numberVertrag,
      },
    ];

    return (
      <div className="container">
        <Link to={"/course-overview"} className={"btn btn-light"}>
          back
        </Link>
        <h1 className="display-4 text-center">Budget Übersicht</h1>
        <div className={"col-md-4"}>
          <label htmlFor="inputStudent">Semester auswählen</label>
          <SelectListGroup
            placeholder="Semester"
            onChange={this.onChange}
            value={this.state.semester}
            name="semester"
            error={errors.semester}
            options={semesterOptions}
          />
        </div>
        <h6></h6>
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={courseArray}
          columns={columns}
          search
        >
          {(props) => (
            <div>
              <hr />
              <BootstrapTable
                {...props.baseProps}
                striped
                defaultSorted={defaultSorted}
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

BudgetOverview.propTypes = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  semester: PropTypes.object.isRequired,
  contract: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  semester: state.semester,
  contract: state.contract,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCourses,
  getSemesters,
  TutorAdminDataExport,
  getContracts,
})(withRouter(BudgetOverview));
