import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getTutorApplications } from "../../actions/applicationActions";
import { getCoursesForApplication } from "../../actions/courseActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

const { SearchBar } = Search;

class TutorApplicationView extends Component {
  componentDidMount() {
    this.props.getTutorApplications();
    this.props.getCoursesForApplication();
  }

  onApplyClick(id) {
    this.props.postApplication(id);
  }

  render() {
    console.log(this.props.application.applications);
    const { applications } = this.props.application;
    const { courses } = this.props.course;
    let applicationTable;

    //Data for Table
    const entries = courses ? courses : [];
    const applicationentries = applications ? applications : [];

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/course/${row._id}`} className="btn btn-info">
          Betrachten
        </Link>
      );
    }

    function applyButton(cell, row, rowIndex, formatExtraData) {
      if (!applicationentries.some((e) => e.course === row._id)) {
        return (
          <Link to={`/tutorapply/${row._id}`} className="btn btn-info">
            New Application
          </Link>
        );
      } else {
        return (
          <Link to={`/tutorapply/${row._id}`} className="btn btn-primary">
            Edit Application
          </Link>
        );
      }
    }

    if (courses && courses.length > 0) {
      const columns = [
        {
          dataField: "metacourse.name",
          text: "Course",
          sort: true,
        },
        {
          dataField: "requirement",
          text: "Requirements",
          sort: true,
        },
        {
          dataField: "advisor",
          text: "Advisor",
          sort: true,
        },
        {
          text: "Apply",
          header: "Apply",
          id: "links",
          formatter: applyButton,
        },
      ];

      applicationTable = (
        <ToolkitProvider keyField="id" data={entries} columns={columns} search>
          {(props) => (
            <div>
              <SearchBar {...props.searchProps} />
              <hr />
              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      );
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Link to={"/dashboard"} className={"btn btn-light"}>
              back
            </Link>
            <h1 className="display-4 text-center">Courses to Apply</h1>

            {applicationTable}
          </div>
        </div>
      </div>
    );
  }
}

TutorApplicationView.propTypes = {
  getTutorApplications: PropTypes.func.isRequired,
  getCoursesForApplication: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
  course: state.course,
});

export default connect(mapStateToProps, {
  getTutorApplications,
  getCoursesForApplication,
})(TutorApplicationView);
