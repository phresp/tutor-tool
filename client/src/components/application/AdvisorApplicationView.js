import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getApplicationsOfCourse } from "../../actions/applicationActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import paginationFactory from "react-bootstrap-table2-paginator";

const { SearchBar } = Search;

class AdvisorApplicationView extends Component {
  componentWillMount() {
    this.props.getApplicationsOfCourse(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { applications } = this.props.application;
    console.log(applications);
    let applicationTable;

    //Data for Table
    const entries = applications ? applications : [];

    if (applications.length > 0) {
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
          dataField: "profilematrikelnummer",
          text: "Matrikelnummer",
          sort: true,
        },
        {
          text: "Betrachten",
          header: "Edit",
          id: "links",
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
  application: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
});

export default connect(mapStateToProps, { getApplicationsOfCourse })(
  AdvisorApplicationView
);
