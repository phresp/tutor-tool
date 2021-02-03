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

import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";

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

  render() {
    const { applications } = this.props.application;
    let applicationTable;

    const defaultSorted = [
      {
        dataField: "grade",
        order: "asc",
      },
    ];

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
            Create Contract
          </Link>
        );
      }
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
          dataField: "grade",
          text: "Note",
          sort: true,
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
          text: "Vertrag erstellen",
          header: "Edit",
          id: "links",
          formatter: contractButton,
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
                striped
                pagination={paginationFactory()}
                defaultSorted={defaultSorted}
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
            <Link to={"/course-overview"} className={"btn btn-light"}>
              back
            </Link>
            <h1 className="display-4 text-center">
              Bewerbungen für {coursename} in {coursesem}
            </h1>

            {applicationTable}
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
})(AdminApplicationView);
