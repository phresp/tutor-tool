import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getApplicationsOfCourse,
  acceptApplication,
} from "../../actions/applicationActions";
import { getCourseById } from "../../actions/courseActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import { TutorAdminDataExport } from "../../actions/formsActions";

import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";
import isEmpty from "validator/es/lib/isEmpty";
import Spinner from "../common/Spinner";

const { SearchBar } = Search;

class AdminApplicationView extends Component {
  componentDidMount() {
    this.props.getApplicationsOfCourse(this.props.match.params.id);
    this.props.getCourseById(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onDownloadClick(e) {
    e.preventDefault();
    this.props.TutorAdminDataExport(this.props.match.params.id);
  }

  render() {
    let { applications, applicationloading } = this.props.application;
    let applicationTable;

    const defaultSorted = [
      {
        dataField: "grade",
        order: "asc",
      },
    ];

    //Coursename and Semester
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

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/applicationdetails/${row._id}`} className="btn btn-info">
          Profile
        </Link>
      );
    }

    function contractButton(cell, row, rowIndex, formatExtraData) {
      if (row.status === "Accepted") {
        return (
          <Link to={`/create-contract/${row._id}`} className="btn btn-primary">
            Vertrag erstellen
          </Link>
        );
      }
    }

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
                Annehmen
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
                Zurücksetzen
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
              Ablehnen
            </button>
          );
        }
      }
    }

    const prioFormatter = (value, cell, row, rowIndex, formatExtraData) => {
      if (value === "3") {
        return "Hoch";
      } else if (value === "2") {
        return "Mittel";
      } else if (value === "1") {
        return "Niedrig";
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
          dataField: "grade",
          text: "Note",
          sort: true,
        },
        {
          dataField: "priority",
          text: "Prio",
          sort: true,
          formatter: prioFormatter,
        },
        {
          dataField: "status",
          text: "Bewerbungsstatus",
          sort: true,
        },
        {
          text: "Bewerbung ansehen",
          header: "Edit",
          id: "links",
          formatter: betrachtenButton,
        },
        {
          text: "Annehmen",
          header: "Edit",
          id: "links",
          formatter: acceptButton,
        },
        {
          text: "Ablehnen",
          header: "Edit",
          id: "links",
          formatter: declineButton,
        },
        {
          text: "Vertrag erstellen",
          header: "Edit",
          id: "links",
          formatter: contractButton,
        },
      ];

      if (applicationloading) {
        applicationTable = <Spinner />;
      } else {
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
                <button
                  type="button"
                  onClick={this.onDownloadClick.bind(this)}
                  className="btn btn-info"
                >
                  Vertragsdaten exportieren
                </button>
                <Link
                  to={`/budget-control/${this.props.match.params.id}`}
                  className={"btn btn-primary"}
                >
                  Budgetübersicht
                </Link>
                <Link
                  to={`/advisor-edit-course/${this.props.match.params.id}`}
                  className={"btn btn-secondary"}
                >
                  Details
                </Link>
                <SearchBar {...props.searchProps} />
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  striped
                  pagination={paginationFactory()}
                  defaultSorted={defaultSorted}
                />
              </div>
            )}
          </ToolkitProvider>
        );
      }
    }

    var courseApplicationView;
    if (!entries[0] && !applicationloading) {
      courseApplicationView = (
        <h3 className={"text-center"}>Noch keine Bewerbungen</h3>
      );
    } else {
      courseApplicationView = applicationTable;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to={"/course-overview"} className={"btn btn-light"}>
              back
            </Link>
            <h1 className="display-4 text-center">
              Bewerbungen für {coursename} in {coursesem}
            </h1>

            {courseApplicationView}
          </div>
        </div>
      </div>
    );
  }
}

AdminApplicationView.propTypes = {
  getApplicationsOfCourse: PropTypes.func.isRequired,
  acceptApplication: PropTypes.func.isRequired,
  getCourseById: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
  course: state.course,
});

export default connect(mapStateToProps, {
  getApplicationsOfCourse,
  acceptApplication,
  getCourseById,
  TutorAdminDataExport,
})(AdminApplicationView);
