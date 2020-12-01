import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getApplications } from "../../actions/applicationActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";
import paginationFactory from "react-bootstrap-table2-paginator";

const { SearchBar } = Search;

class AddivsorApplicationView extends Component {
  componentDidMount() {
    this.props.getApplications();
  }

  render() {
    const { applications } = this.props.application;
    let applicationTable;

    //Data for Table
    const entries = applications ? applications : [];

    if (applications.length > 0) {
      const columns = [
        {
          dataField: "lastname",
          text: "Nachname",
          sort: true,
        },
        {
          dataField: "firstname",
          text: "Vorname",
          sort: true,
        },
        {
          dataField: "user.email",
          text: "Email",
          sort: true,
        },
        {
          dataField: "matrikelnummer",
          text: "Matrikelnummer",
          sort: true,
        },
        {
          dataField: "date",
          text: "Zuletzt bearbeitet",
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

    return <div></div>;
  }
}

AddivsorApplicationView.propTypes = {
  getApplications: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
});

export default connect(mapStateToProps, { getApplications })(
  AddivsorApplicationView
);
