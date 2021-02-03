import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";

const { SearchBar } = Search;

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fil: "0",
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getProfiles();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileTable;

    //Data for Table
    const entries = profiles ? profiles : [];

    var newArray = entries.filter((el) => {
      if (el.user) {
        if (this.state.fil === "0") return el;
        if (this.state.fil === "Admin") return el.user.role === "Admin";
        if (this.state.fil === "Advisor") return el.user.role === "Advisor";
        if (this.state.fil === "Student") return el.user.role === "Student";
        if (this.state.fil === "RBG") return el.user.role === "RBG";
      }
    });

    const defaultSorted = [
      {
        dataField: "lastname",
        order: "asc",
      },
    ];

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/profile/${row._id}`} className="btn btn-info">
          Betrachten
        </Link>
      );
    }

    function dateFormat(value, row, index) {
      if (value) return moment(value).format("DD/MM/YYYY");
    }

    function trueFormat(value, row, index) {
      if (value) return "X";
    }

    if (profiles === null || loading) {
      profileTable = <Spinner />;
    } else {
      if (profiles.length > 0) {
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
            formatter: dateFormat,
            sort: true,
          },
          {
            text: "Betrachten",
            header: "Edit",
            id: "links",
            formatter: betrachtenButton,
          },
        ];

        profileTable = (
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={newArray}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <h6>Rollen Filter:</h6>

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
                    this.state.fil === "Admin"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "Admin",
                    });
                  }}
                >
                  {" "}
                  Admin
                </button>

                <button
                  className={
                    this.state.fil === "Advisor"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "Advisor",
                    });
                  }}
                >
                  {" "}
                  Übungsleiter
                </button>

                <button
                  className={
                    this.state.fil === "Student"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "Student",
                    });
                  }}
                >
                  {" "}
                  Student
                </button>

                <button
                  className={
                    this.state.fil === "RBG"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "RBG",
                    });
                  }}
                >
                  {" "}
                  RBG
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
      } else {
        profileTable = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to={"/dashboard"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Benutzer Übersicht</h1>

              {profileTable}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
