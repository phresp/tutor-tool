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
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileTable;

    //Data for Table
    const entries = profiles ? profiles : [];

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
      } else {
        profileTable = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Link to={"/dashboard"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Tutor Profiles</h1>

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
