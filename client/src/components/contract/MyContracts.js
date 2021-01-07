import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import { getMyContracts } from "../../actions/contractActions";

import paginationFactory from "react-bootstrap-table2-paginator";
import Spinner from "../common/Spinner";

const { SearchBar } = Search;

class MyContracts extends Component {
  componentDidMount() {
    this.props.getMyContracts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    var contracts;

    if (this.props.contract) {
      contracts = this.props.contract.contracts;
    }
    let contractTable;

    //Data for Table
    const entries = contracts ? contracts : [];

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/view-contract/${row._id}`} className="btn btn-info">
          View
        </Link>
      );
    }

    if (contracts === null || this.props.contract.contractloading) {
      contractTable = <Spinner />;
    } else {
      if (!contracts || contracts.length > 0) {
        const columns = [
          {
            dataField: "course.metacourse.name",
            text: "Course",
            sort: true,
          },
          {
            dataField: "hours",
            text: "Nachname",
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
            <h1 className="display-4 text-center">My Contracts</h1>

            {contractTable}
          </div>
        </div>
      </div>
    );
  }
}

MyContracts.propTypes = {
  getContracts: PropTypes.func.isRequired,
  contract: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contract: state.contract,
});

export default connect(mapStateToProps, {
  getMyContracts,
})(MyContracts);
