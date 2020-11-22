import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getSemester } from "../../actions/semesterActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";

const { SearchBar } = Search;

class SemesterOverview extends Component {
  componentDidMount() {
    this.props.getSemester();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { semester } = this.props.semester;
    const semArray = semester ? semester : [];

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/semester/${row._id}`} className="btn btn-info">
          Bearbeiten
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
      { dataField: "from", text: "From:", sort: true, formatter: dateFormat },
      { dataField: "to", text: "To:", sort: true, formatter: dateFormat },
      {
        dataField: "coursefrom",
        text: "Courses from:",
        sort: true,
        formatter: dateFormat,
      },
      {
        dataField: "courseto",
        text: "Courses till:",
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
        <div className="container-fluid">
          <Link to={"/dashboard"} className={"btn btn-light"}>
            back
          </Link>
          <h1 className={"diuplay-4"}>Semester Overview</h1>
          <Link to="/new-semester" className="btn btn-info">
            <i className="fas fa-user-circle text-primary"></i> New Semester
          </Link>
          <h6></h6>
          <ToolkitProvider
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
  getSemester: PropTypes.func.isRequired,
  semester: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  semester: state.semester,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSemester })(
  withRouter(SemesterOverview)
);
