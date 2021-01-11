import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import { getContracts } from "../../actions/contractActions";

import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";
import Spinner from "../common/Spinner";

const { SearchBar } = Search;

class ContractOverview extends Component {
  componentDidMount() {
    this.props.getContracts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const defaultSorted = [
      {
        dataField: "status",
        order: "asc",
      },
    ];

    var contracts;

    if (this.props.contract) {
      contracts = this.props.contract.contracts;
    }
    let contractTable;

    //Data for Table
    const entries = contracts ? contracts : [];

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/edit-contract/${row._id}`} className="btn btn-info">
          Edit
        </Link>
      );
    }

    if (contracts === null || this.props.contract.contractloading) {
      contractTable = <Spinner />;
    } else {
      if (!contracts || contracts.length > 0) {
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
            dataField: "course.metacourse.name",
            text: "Course",
            sort: true,
          },
          {
            dataField: "status",
            text: "Status",
            sort: true,
          },
          {
            text: "View Contract",
            header: "Edit",
            id: "links",
            formatter: betrachtenButton,
          },
        ];

        contractTable = (
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
                  striped
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  defaultSorted={defaultSorted}
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
            <h1 className="display-4 text-center">Contracts</h1>

            {contractTable}
          </div>
        </div>
      </div>
    );
  }
}

ContractOverview.propTypes = {
  getContracts: PropTypes.func.isRequired,
  contract: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contract: state.contract,
});

export default connect(mapStateToProps, {
  getContracts,
})(ContractOverview);
