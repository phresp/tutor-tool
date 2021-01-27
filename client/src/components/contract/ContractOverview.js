import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import { getContracts } from "../../actions/contractActions";

import paginationFactory from "react-bootstrap-table2-paginator";
import Spinner from "../common/Spinner";

const { SearchBar } = Search;

class ContractOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fil: "0",
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getContracts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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

    var newArray = entries.filter((el) => {
      if (this.state.fil === "0") return el;
      if (this.state.fil === "Created") return el.status === "Created";
      if (this.state.fil === "Signable") return el.status === "Signable";
      if (this.state.fil === "Incomplete") return el.status === "Incomplete";
      if (this.state.fil === "In Process") return el.status === "In Process";
      if (this.state.fil === "Completed") return el.status === "Completed";
    });

    const betrachtenButton = (cell, row, rowIndex, formatExtraData) => {
      return (
        <Link to={`/edit-contract/${row._id}`} className="btn btn-info">
          Edit
        </Link>
      );
    };

    const dateFormat = (value, row, index) => {
      if (value) return moment(value).format("DD/MM/YYYY");
    };

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
            dataField: "course.metacourse.name",
            text: "Kurs",
            sort: true,
          },
          {
            dataField: "contractstart",
            text: "Vertrag Start",
            formatter: dateFormat,
            sort: true,
          },
          {
            dataField: "contractend",
            text: "Vertrag Ende",
            formatter: dateFormat,
            sort: true,
          },
          {
            dataField: "hours",
            text: "W-Stunden",
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
            data={newArray}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <h6>Status Filter:</h6>

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
                    this.state.fil === "Created"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "Created",
                    });
                  }}
                >
                  {" "}
                  Created
                </button>

                <button
                  className={
                    this.state.fil === "Incomplete"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "Incomplete",
                    });
                  }}
                >
                  {" "}
                  Incomplete
                </button>

                <button
                  className={
                    this.state.fil === "In Process"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "In Process",
                    });
                  }}
                >
                  {" "}
                  In Process
                </button>

                <button
                  className={
                    this.state.fil === "Signable"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "Signable",
                    });
                  }}
                >
                  {" "}
                  Signable
                </button>

                <button
                  className={
                    this.state.fil === "Completed"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "Completed",
                    });
                  }}
                >
                  {" "}
                  Completed
                </button>
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
            <h1 className="display-4 text-center">Verträge</h1>

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
