import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getSemesters } from "../../actions/semesterActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";

const { SearchBar } = Search;

class SemesterOverview extends Component {
  componentWillMount() {
    this.props.getSemesters();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { semesters } = this.props.semester;
    const semArray = semesters ? semesters : [];

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/edit-semester/${row._id}`} className="btn btn-info">
          Edit
        </Link>
      );
    }

    function dateFormat(value, row, index) {
      if (value) return moment(value).format("DD/MM/YYYY");
    }

    const columns = [
      {
        dataField: "name",
        text: "Semester",
        sort: true,
      },
      { dataField: "from", text: "Von", sort: true, formatter: dateFormat },
      { dataField: "to", text: "Bis", sort: true, formatter: dateFormat },
      {
        dataField: "coursefrom",
        text: "Kurse von",
        sort: true,
        formatter: dateFormat,
      },
      {
        dataField: "courseto",
        text: "Kurse bis",
        sort: true,
        formatter: dateFormat,
      },
      {
        text: "Edit",
        header: "Edit",
        id: "links",
        formatter: betrachtenButton,
      },
    ];

    return (
      <div className="Semester Overview">
        <div className="container">
          <Link to={"/dashboard"} className={"btn btn-light"}>
            back
          </Link>
          <h1 className={"display-4"}>Semester Übersicht</h1>
          <Link to="/create-semester" className="btn btn-info">
            <i className="fas fa-user-circle text-primary"></i> Neues Semester
          </Link>
          <h6></h6>
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={semArray}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
        </div>
      </div>
    );
  }
}

SemesterOverview.propTypes = {
  getSemesters: PropTypes.func.isRequired,
  semester: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  semester: state.semester,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSemesters })(
  withRouter(SemesterOverview)
);
