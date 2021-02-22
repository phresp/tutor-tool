import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getApplicationsOfCourse,
  acceptApplication,
} from "../../actions/applicationActions";

import { TutorDataExport } from "../../actions/formsActions";

import { getCurrentProfile } from "../../actions/profileActions";

import { getCourseById } from "../../actions/courseActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";

const { SearchBar } = Search;

class AdvisorApplicationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fil: "0",
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getApplicationsOfCourse(this.props.match.params.id);
    this.props.getCourseById(this.props.match.params.id);
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDownloadClick(e) {
    e.preventDefault();
    this.props.TutorDataExport(this.props.match.params.id);
  }

  render() {
    const { applications } = this.props.application;
    const { profile } = this.props.profile;
    let applicationTable;

    var coursename;
    var coursesem;
    if (this.props.course) {
      if (this.props.course.course) {
        if (this.props.course.course.metacourse.name) {
          coursename = this.props.course.course.metacourse.name;
        }
        if (this.props.course.course.semester.name) {
          coursesem = this.props.course.course.semester.name;
        }
      }
    }

    //Data for Table
    const entries = applications ? applications : [];

    //Dash Button Filter
    var newArray = entries.filter((el) => {
      if (el.user) {
        if (this.state.fil === "0") return el;
        if (this.state.fil === "Applied") return el.status === "Applied";
        if (this.state.fil === "Accepted") return el.status === "Accepted";
        if (this.state.fil === "Contract") return el.status === "Contract";
        if (this.state.fil === "Declined") return el.status === "Declined";
        if (this.state.fil === "LastLogin") {
          if (profile.user.lastlogin) {
            if (el.date >= profile.user.lastlogin) {
              return true;
            }
          }
        }
      }
    });

    //TODO: axios auslagern und ohne reload button verschwinden lassen

    //Accept Button
    const course = this.props.match.params.id;

    function acceptButton(cell, row, rowIndex, formatExtraData) {
      if (row) {
        if (row.status) {
          if (row.status === "Applied") {
            return (
              <button
                onClick={() => {
                  axios
                    .post(`/api/application/accept/${row._id}`)
                    .then((res) => {
                      window.location.reload();
                    });
                }}
                className="btn btn-primary"
              >
                Accept Application
              </button>
            );
          } else if (row.status === "Accepted" || row.status === "Declined") {
            return (
              <button
                onClick={() => {
                  axios
                    .post(`/api/application/applied/${row._id}`)
                    .then((res) => {
                      window.location.reload();
                    });
                }}
                className="btn btn-secondary"
              >
                Reset Application
              </button>
            );
          }
        }
      }
    }

    function declineButton(cell, row, rowIndex, formatExtraData) {
      if (row.status) {
        if (row.status === "Applied") {
          return (
            <button
              onClick={() => {
                axios
                  .post(`/api/application/decline/${row._id}`)
                  .then((res) => {
                    window.location.reload();
                  });
              }}
              className="btn btn-danger"
            >
              Decline Application
            </button>
          );
        }
      }
    }

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/applicationdetails/${row._id}`} className="btn btn-info">
          Profile
        </Link>
      );
    }

    const prioFormatter = (value, cell, row, rowIndex, formatExtraData) => {
      if (value === "3") {
        return "Low";
      } else if (value === "2") {
        return "Medium";
      } else if (value === "1") {
        return "High";
      }
    };

    //TODO: Filter nach Applied, Accepted, Declined, New

    if (!applications || applications.length > 0) {
      const columns = [
        {
          dataField: "profile.lastname",
          text: "Nachname",
          sort: true,
        },
        {
          dataField: "profile.firstname",
          text: "Vorname",
          sort: true,
        },
        {
          dataField: "profile.matrikelnummer",
          text: "Matrikelnumber",
          sort: true,
        },
        {
          dataField: "grade",
          text: "Grade",
          sort: true,
        },
        {
          dataField: "priority",
          text: "Priority",
          sort: true,
          formatter: prioFormatter,
        },
        {
          dataField: "status",
          text: "Status",
          sort: true,
        },
        {
          text: "View Profile",
          header: "Edit",
          id: "links",
          formatter: betrachtenButton,
        },
        {
          text: "Accept",
          header: "Edit",
          id: "links",
          formatter: acceptButton,
        },
        {
          text: "Decline",
          header: "Edit",
          id: "links",
          formatter: declineButton,
        },
      ];

      applicationTable = (
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={newArray}
          columns={columns}
          search
        >
          {(props) => (
            <div>
              <h6>Role Filter:</h6>

              <button
                className={
                  this.state.fil === "0" ? "btn btn-primary" : "btn btn-light"
                }
                onClick={() => {
                  this.setState({
                    fil: "0",
                  });
                }}
              >
                {" "}
                Alle
              </button>
              <button
                className={
                  this.state.fil === "Applied"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  this.setState({
                    fil: "Applied",
                  });
                }}
              >
                {" "}
                Applied
              </button>

              <button
                className={
                  this.state.fil === "Accepted"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  this.setState({
                    fil: "Accepted",
                  });
                }}
              >
                {" "}
                Accepted
              </button>

              <button
                className={
                  this.state.fil === "Declined"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  this.setState({
                    fil: "Declined",
                  });
                }}
              >
                {" "}
                Declined
              </button>

              <button
                className={
                  this.state.fil === "Contract"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  this.setState({
                    fil: "Contract",
                  });
                }}
              >
                {" "}
                Contract
              </button>

              <button
                className={
                  this.state.fil === "LastLogin"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  this.setState({
                    fil: "LastLogin",
                  });
                }}
              >
                {" "}
                New since last Login
              </button>
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
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to={"/advisor-classes"} className={"btn btn-light"}>
              back
            </Link>
            <h1 className="display-4 text-center">
              Applications for {coursename} in {coursesem}
            </h1>
            <button
              type="button"
              title="Export the data of tutors, that already have a contract to an excel file"
              onClick={this.onDownloadClick.bind(this)}
              className="btn btn-primary"
            >
              Export Tutordata
            </button>

            {applicationTable}
          </div>
        </div>
      </div>
    );
  }
}

AdvisorApplicationView.propTypes = {
  getApplicationsOfCourse: PropTypes.func.isRequired,
  acceptApplication: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
  rofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
  course: state.course,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getApplicationsOfCourse,
  acceptApplication,
  getCourseById,
  getCurrentProfile,
  TutorDataExport,
})(AdvisorApplicationView);
