import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getRentalsapplications } from "../../actions/rentalActions";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";

const { SearchBar, ClearSearchButton } = Search;

class RentalApplicationOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fil: "0",
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getRentalsapplications();
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
    //Data for Table
    const { rentalapplications } = this.props.rentals;
    const entries = rentalapplications ? rentalapplications : [];

    var newArray = entries.filter((ele) => ele.status === "Applied");

    function dateFormat(value, row, index) {
      if (value) return moment(value).format("DD/MM/YYYY");
    }

    function trueFormat(value, row, index) {
      if (value) return "X";
    }

    function rentalButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link
          to={`/createrentalfromapplication/${row._id}`}
          className="btn btn-primary"
        >
          Leihe erstellen
        </Link>
      );
    }

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
        dataField: "email",
        text: "Email",
        sort: true,
      },
      {
        dataField: "tumid",
        text: "TUM-ID",
        sort: true,
      },
      {
        dataField: "leihobjekt.ipad",
        text: "iPad",
        formatter: trueFormat,
        align: "center",
        sort: true,
      },
      {
        dataField: "leihobjekt.mikrofon",
        text: "Mikrofon",
        formatter: trueFormat,
        align: "center",
        sort: true,
      },
      {
        dataField: "leihobjekt.wacom",
        text: "Wacom",
        formatter: trueFormat,
        align: "center",
        sort: true,
      },
      {
        dataField: "leihobjekt.webcam",
        text: "Webcam",
        formatter: trueFormat,
        align: "center",
        sort: true,
      },
      {
        dataField: "leihobjekt.stativ",
        text: "Stativ",
        formatter: trueFormat,
        align: "center",
        sort: true,
      },
      {
        dataField: "date",
        text: "Zuletzt bearbeitet",
        formatter: dateFormat,
        sort: true,
      },
      {
        text: "Vertrag erstellen",
        header: "Edit",
        id: "links",
        formatter: rentalButton,
      },
    ];

    const paginationOptions = {
      sizePerPageList: [
        {
          text: "10",
          value: 10,
        },
        {
          text: "25",
          value: 25,
        },
        {
          text: "50",
          value: 50,
        },
        {
          text: "100",
          value: 100,
        },
      ],
    };

    return (
      <div className="container-fluid">
        <div className="container">
          <Link to={"/rentals-overview"} className={"btn btn-light"}>
            back
          </Link>
          <h1 className="display-4 text-center">Leihanfragen</h1>
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={newArray}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <hr />
                <BootstrapTable
                  striped
                  {...props.baseProps}
                  pagination={paginationFactory(paginationOptions)}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
      </div>
    );
  }
}

RentalApplicationOverview.propTypes = {
  rentals: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  rentals: state.rentals,
  auth: state.auth,
});

export default connect(mapStateToProps, { getRentalsapplications })(
  withRouter(RentalApplicationOverview)
);
