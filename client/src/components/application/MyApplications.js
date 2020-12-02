import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getTutorApplications } from "../../actions/applicationActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

const { SearchBar } = Search;

class MyApplications extends Component {
  componentDidMount() {
    this.props.getTutorApplications();
  }

  onApplyClick(id) {
    this.props.postApplication(id);
  }

  render() {
    const { applications } = this.props.application;
    let applicationTable;

    //Data for Table
    const entries = applications ? applications : [];

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/tutorapply/${row._id}`} className="btn btn-info">
          Betrachten
        </Link>
      );
    }

    if (applications && applications.length > 0) {
      const columns = [
        {
          dataField: "course.metacourse.name",
          text: "Course",
          sort: true,
        },
        {
          dataField: "course.metacourse.module",
          text: "Module",
          sort: true,
        },
        {
          dataField: "grade",
          text: "My Grade",
          sort: true,
        },
        {
          dataField: "status",
          text: "Status",
          sort: true,
        },
        {
          text: "Edit",
          header: "Edit",
          id: "links",
          formatter: betrachtenButton,
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

MyApplications.propTypes = {
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
})(MyApplications);
