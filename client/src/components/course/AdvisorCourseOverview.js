import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getAdvisorCourses } from "../../actions/courseActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";

const { SearchBar } = Search;

class AdvisorCourseOverview extends Component {
  componentWillMount() {
    this.props.getAdvisorCourses();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { courses } = this.props.course;
    var courseArray = courses ? courses : [];

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/check-applications/${row._id}`} className="btn btn-info">
          Check Applications
        </Link>
      );
    }

    const numberApplications = (cell, row, rowIndex, formatExtraData) => {
      if (row.applications) {
        return row.applications.length;
      }
    };

    const numberAccepted = (cell, row, rowIndex, formatExtraData) => {
      if (row.applications) {
        return row.applications.filter(
          (x) => x.status == "Accepted" || x.status == "Contract"
        ).length;
      }
    };

    const columns = [
      {
        dataField: "metacourse[0].name",
        text: "Course",
        sort: true,
      },
      {
        dataField: "semester[0].name",
        text: "Semester",
        sort: true,
      },
      {
        text: "Applications",
        formatter: numberApplications,
        sort: true,
      },
      {
        text: "Accepted",
        formatter: numberAccepted,
        sort: true,
      },
      {
        dataField: "maxtutornumber",
        text: "Needed Tutors",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        id: "links",
        formatter: betrachtenButton,
      },
    ];

    return (
      <div className="container">
        <Link to={"/dashboard"} className={"btn btn-light"}>
          back
        </Link>
        <h1 className={"display-4"}>Your Courses</h1>
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
              <SearchBar {...props.searchProps} />
              <hr />
              <BootstrapTable {...props.baseProps} />
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

AdvisorCourseOverview.propTypes = {
  getAdvisorCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAdvisorCourses })(
  withRouter(AdvisorCourseOverview)
);
