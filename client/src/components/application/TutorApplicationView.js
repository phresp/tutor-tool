import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getTutorApplications } from "../../actions/applicationActions";
import { getCoursesForApplication } from "../../actions/courseActions";
import { getAdvisors } from "../../actions/profileActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import isEmpty from "validator/es/lib/isEmpty";
import Spinner from "../common/Spinner";

const { SearchBar } = Search;

class TutorApplicationView extends Component {
  componentDidMount() {
    this.props.getTutorApplications();
    this.props.getCoursesForApplication();
    this.props.getAdvisors();
  }

  onApplyClick(id) {
    this.props.postApplication(id);
  }

  render() {
    let { applications, applicationloading } = this.props.application;
    let { courses, courseloading } = this.props.course;
    let { advisors, loading } = this.props.profile;
    let applicationTable;

    if (
      applications === null ||
      courses === null ||
      advisors === null ||
      applicationloading ||
      courseloading ||
      loading
    ) {
      applicationTable = <Spinner />;
    } else {
      //Data for Table
      const entries = courses ? courses : [];

      function applyButton(cell, row, rowIndex, formatExtraData) {
        return (
          <Link to={`/tutorapply/${row._id}`} className="btn btn-info">
            Apply
          </Link>
        );
      }
      function statusFormatter(value, row, rowIndex, formatExtraData) {
        var result = applications.filter((obj) => {
          //console.log(Object.keys(obj.course));
          return obj.course === value;
        });
        if (result[0]) {
          return result[0].status;
        } else {
          return "";
        }
      }

      function advisorFormatter(value, row, rowIndex, formatExtraData) {
        var result = advisors.filter((obj) => {
          console.log(Object.keys(obj.user));
          return obj.user._id === value;
        });
        if (result[0]) {
          return result[0].firstname + " " + result[0].lastname;
        } else {
          return "";
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
            formatter: advisorFormatter,
          },
          {
            dataField: "_id",
            text: "Status",
            sort: true,
            formatter: statusFormatter,
          },
          {
            text: "Apply",
            header: "Apply",
            id: "links",
            formatter: applyButton,
          },
        ];

        applicationTable = (
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={entries}
            columns={columns}
            search
          >
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
  getAdvisors: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
  course: state.course,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getTutorApplications,
  getCoursesForApplication,
  getAdvisors,
})(TutorApplicationView);
