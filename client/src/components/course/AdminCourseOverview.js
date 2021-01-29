import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getAdvisorCourses } from "../../actions/courseActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";

const { SearchBar } = Search;

class AdminCourseOverview extends Component {
  componentWillMount() {
    this.props.getAdvisorCourses();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { courses } = this.props.course;
    const courseArray = courses ? courses : [];

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/check-applications/${row._id}`} className="btn btn-info">
          Check Applications
        </Link>
      );
    }

    function applicationsButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/course-applications/${row._id}`} className="btn btn-info">
          Check Applications
        </Link>
      );
    }

    const columns = [
      {
        dataField: "metacourse.name",
        text: "Course:",
        sort: true,
      },
      {
        dataField: "semester.name",
        text: "Semester",
        sort: true,
      },
      {
        dataField: "groupsize",
        text: "Groupsize",
        sort: true,
      },
      {
        dataField: "tutorialhours",
        text: "Tutorialhours",
        sort: true,
      },
      {
        dataField: "studentnumber",
        text: "Studentnumber",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        id: "links",
        formatter: betrachtenButton,
      },
      {
        id: "links",
        formatter: applicationsButton,
      },
    ];

    return (
      <div className="container">
        <Link to={"/dashboard"} className={"btn btn-light"}>
          back
        </Link>
        <h1 className={"display-4"}>Class Overview</h1>
        <h6></h6>
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={courseArray}
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
    );
  }
}

AdminCourseOverview.propTypes = {
  getAdvisorCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAdvisorCourses })(
  withRouter(AdminCourseOverview)
);
