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
import Spinner from "../common/Spinner";
import axios from "axios";

const { SearchBar } = Search;

class TutorApplicationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
  }

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

    applications = applications ? applications : [];
    let applicationsCounter = 0;
    applications.forEach((e) => {
      if (e.status === "Applied") {
        applicationsCounter += 1;
      }
    });

    var applicationTooltip;
    if (applicationsCounter >= 3) {
      applicationTooltip = (
        <h3 className="text-danger text-center">
          Maximum Number of Applications reached!
        </h3>
      );
      if (!this.state.disabled) {
        this.setState({ disabled: true });
      }
    }

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

      const applyButton = (value, row, rowIndex, formatExtraData) => {
        var result = applications.filter((obj) => {
          if (obj.course) return obj.course._id === value;
        });
        if (result[0]) {
          if (
            result[0].status !== "Contract" &&
            result[0].status !== "Declined"
          ) {
            if (!this.state.disabled) {
              return (
                <Link to={`/tutorapply/${row._id}`} className="btn btn-info">
                  Edit
                </Link>
              );
            } else if (this.state.disabled) {
              return (
                <button
                  className="btn btn-info"
                  type="button"
                  disabled={this.state.disabled}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Tooltip on top"
                >
                  Edit
                </button>
              );
            }
          } else {
            return "";
          }
        } else {
          if (!this.state.disabled) {
            return (
              <Link to={`/tutorapply/${row._id}`} className="btn btn-info">
                Apply
              </Link>
            );
          } else if (this.state.disabled) {
            return (
              <button
                className="btn btn-info"
                type="button"
                disabled={this.state.disabled}
                data-toggle="tooltip"
                data-placement="top"
                title="Tooltip on top"
              >
                Apply
              </button>
            );
          }
        }
      };

      const deleteButton = (value, row, rowIndex, formatExtraData) => {
        var result = applications.filter((obj) => {
          if (obj.course) return obj.course._id === value;
        });
        if (result[0]) {
          if (result[0].status === "Applied") {
            return (
              <button
                onClick={() => {
                  axios
                    .delete(`/api/application/${result[0]._id}`)
                    .then((res) => {
                      window.location.reload();
                    });
                }}
                className="btn btn-danger"
              >
                Delete Application
              </button>
            );
          } else {
            return "";
          }
        } else {
          return "";
        }
      };

      const statusFormatter = (value, row, rowIndex, formatExtraData) => {
        var result = applications.filter((obj) => {
          if (obj.course) return obj.course._id === value;
        });
        if (result[0]) {
          return result[0].status;
        } else {
          return "";
        }
      };

      const advisorFormatter = (value, row, rowIndex, formatExtraData) => {
        var result = advisors.filter((obj) => {
          return obj.user._id === value;
        });
        if (result[0]) {
          return result[0].firstname + " " + result[0].lastname;
        } else {
          return "";
        }
      };

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
            dataField: "_id",
            text: "Apply",
            header: "Apply",
            id: "links",
            formatter: applyButton,
          },
          {
            dataField: "_id",
            text: "Delete",
            formatter: deleteButton,
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
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to={"/dashboard"} className={"btn btn-light"}>
              back
            </Link>
            <h1 className="display-4 text-center">Courses to Apply</h1>
            {applicationTooltip}
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
