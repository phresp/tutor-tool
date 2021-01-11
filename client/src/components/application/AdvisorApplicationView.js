import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getApplicationsOfCourse,
  acceptApplication,
} from "../../actions/applicationActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";

const { SearchBar } = Search;

class AdvisorApplicationView extends Component {
  componentDidMount() {
    this.props.getApplicationsOfCourse(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { applications } = this.props.application;
    let applicationTable;

    //Data for Table
    const entries = applications ? applications : [];

    //TODO: axios auslagern und ohne reload button verschwinden lassen

    //Accept Button
    const course = this.props.match.params.id;

    function acceptButton(cell, row, rowIndex, formatExtraData) {
      if (row) {
        if (row.status) {
          if (row.status !== "Accepted") {
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
          } else {
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
      return (
        <button
          onClick={() => {
            axios.post(`/api/application/decline/${row._id}`).then((res) => {
              window.location.reload();
            });
          }}
          className="btn btn-danger"
        >
          Decline Application
        </button>
      );
    }

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/applicationdetails/${row._id}`} className="btn btn-info">
          Profile
        </Link>
      );
    }

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

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Link to={"/advisor-classes"} className={"btn btn-light"}>
              back
            </Link>
            <h1 className="display-4 text-center">Applications</h1>

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
};

const mapStateToProps = (state) => ({
  application: state.application,
});

export default connect(mapStateToProps, {
  getApplicationsOfCourse,
  acceptApplication,
})(AdvisorApplicationView);
