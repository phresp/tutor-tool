import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getCourses } from "../../actions/courseActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";

const { SearchBar } = Search;

class CourseOverview extends Component {
  componentWillMount() {
    this.props.getCourses();
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
        <Link to={`/edit-course/${row._id}`} className="btn btn-info">
          Edit
        </Link>
      );
    }

    function dateFormat(value, row, index) {
      if (value) return moment(value).format("DD/MM/YYYY");
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
        dataField: "exam",
        text: "exam",
        sort: true,
      },
      {
        text: "Edit",
        header: "Edit",
        id: "links",
        formatter: betrachtenButton,
      },
    ];

    return (
      <div className="container-fluid">
        <Link to={"/dashboard"} className={"btn btn-light"}>
          back
        </Link>
        <h1 className={"display-4"}>Course Overview</h1>
        <Link to="/create-course" className="btn btn-info">
          <i className="fas fa-user-circle text-primary"></i> New Course
        </Link>
        <h6></h6>
        <ToolkitProvider
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

CourseOverview.propTypes = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCourses })(
  withRouter(CourseOverview)
);
