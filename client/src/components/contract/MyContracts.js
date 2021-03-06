import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import { getMyContracts } from "../../actions/contractActions";
import moment from "moment";

import paginationFactory from "react-bootstrap-table2-paginator";
import Spinner from "../common/Spinner";

const { SearchBar } = Search;

class MyContracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      help: false,
    };
  }

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

    var help;
    if (this.state.help === true) {
      help = (
        <div>
          <h6>
            Here you can see all your Contracts: Please see details for the
            documents you have to hand in. In some cases you might have a "split
            contract", meaning there are two separate lines for each contract
            duration. The respective weekly hours are indicated next to the
            dates of each split contract line.
          </h6>
          <hr />
        </div>
      );
    }

    const defaultSorted = [
      {
        dataField: "contractend",
        order: "desc",
      },
    ];

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

    const dateFormat = (value, row, index) => {
      if (value) return moment(value).format("DD/MM/YYYY");
    };

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
            dataField: "course.semester.name",
            text: "Semester",
            sort: true,
          },

          {
            text: "Contract Start",
            dataField: "contractstart",
            formatter: contractstarts,
            sort: true,
          },
          {
            dataField: "contractend",
            text: "Contract End",
            formatter: contractends,
            sort: true,
          },
          {
            dataField: "hours",
            text: "Weekly Hours",
            formatter: contracthours,
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
          <div>
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
                  <button
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        help: !prevState.help,
                      }));
                    }}
                    className="btn btn-info float-right"
                  >
                    Help
                  </button>{" "}
                  <hr />
                  {help}
                  <BootstrapTable
                    {...props.baseProps}
                    pagination={paginationFactory()}
                    defaultSorted={defaultSorted}
                  />
                </div>
              )}
            </ToolkitProvider>
            <h6>Date format: DD/MM/YYYY</h6>
          </div>
        );
      } else {
        contractTable = (
          <div>
            <hr />
            <h3 className="text-center">You have no contracts yet</h3>
          </div>
        );
      }
    }
    return (
      <div className="container">
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
