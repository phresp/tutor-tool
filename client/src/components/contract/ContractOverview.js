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
    //Multisort not yet implemented in package but is planned
    const defaultSorted = [
      {
        dataField: "status",
        order: "asc",
      },
      {
        dataField: "contractend",
        order: "desc",
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
      if (this.state.fil === "0") return el.status !== "Completed";
      if (this.state.fil === "Created") return el.status === "Created";
      if (this.state.fil === "Signable") return el.status === "Signable";
      if (this.state.fil === "Incomplete") return el.status === "Incomplete";
      if (this.state.fil === "In Process") return el.status === "In Process";
      if (this.state.fil === "Completed") return el.status === "Completed";
      if (this.state.fil === "All") return el;
    });

    const betrachtenButton = (cell, row, rowIndex, formatExtraData) => {
      return (
        <Link to={`/edit-contract/${row._id}`} className="btn btn-info">
          Edit
        </Link>
      );
    };

    const contractstarts = (value, cell, row, rowIndex, formatExtraData) => {
      var start1 = "";
      var start2 = "";
      if (cell.contractstart) {
        start1 = moment(cell.contractstart).format("DD/MM/YYYY");
      }
      if (cell.contractstart2) {
        start2 = moment(cell.contractstart2).format("DD/MM/YYYY");
      }
      return (
        <div>
          {start1} <br /> {start2}
        </div>
      );
    };

    const contractends = (value, cell, row, rowIndex, formatExtraData) => {
      var end1 = "";
      var end2 = "";
      if (cell.contractend) {
        end1 = moment(cell.contractend).format("DD/MM/YYYY");
      }
      if (cell.contractend2) {
        end2 = moment(cell.contractend2).format("DD/MM/YYYY");
      }
      return (
        <div>
          {end1} <br /> {end2}
        </div>
      );
    };

    const contracthours = (value, cell, row, rowIndex, formatExtraData) => {
      var hours1 = "";
      var hours2 = "";
      if (cell.hours) {
        hours1 = cell.hours;
      }
      if (cell.hours2) {
        hours2 = cell.hours2;
      }
      return (
        <div>
          {hours1} <br /> {hours2}
        </div>
      );
    };

    const statusFormatter = (value, cell, row, rowIndex, formatExtraData) => {
      if (value === "Created") {
        return "Erstellt";
      } else if (value === "Signable") {
        return "Unterschriftsbereit";
      } else if (value === "In Process") {
        return "In Bearbeitung";
      } else if (value === "Completed") {
        return "Abgeschlossen";
      } else if (value === "Incomplete") {
        return "Unvollständig";
      }
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
            text: "Vertrag Start",
            dataField: "contractstart",
            formatter: contractstarts,
            sort: true,
          },
          {
            dataField: "contractend",
            text: "Vertrag Ende",
            formatter: contractends,
            sort: true,
          },
          {
            dataField: "hours",
            text: "W-Stunden",
            formatter: contracthours,
            sort: true,
          },
          {
            dataField: "status",
            text: "Status",
            sort: true,
            formatter: statusFormatter,
          },
          {
            dataField: "lasthandle",
            text: "Kürzel",
            sort: true,
          },
          {
            dataField: "lastchangeddate",
            text: "Letzte Änderung",
            sort: true,
            formatter: dateFormat,
          },
          {
            text: "Vertrag bearbeiten",
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
                  Offen
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
                  Erstellt
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
                  Unvollständig
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
                  In Bearbeitung
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
                  Unterschriftsbereit
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
                  Abgeschlossen
                </button>

                <button
                  className={
                    this.state.fil === "All"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "All",
                    });
                  }}
                >
                  {" "}
                  Alle
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
        <div className="container">
          <Link to={"/dashboard"} className={"btn btn-light"}>
            back
          </Link>
          <h1 className="display-4 text-center">Verträge</h1>
          <Link to="/createseparatecontract" className="btn btn-info">
            Leeren Vertrag anlegen
          </Link>
          <Link to="/contractstats" className="btn btn-primary">
            Vertragsstatistiken
          </Link>
          {contractTable}
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
