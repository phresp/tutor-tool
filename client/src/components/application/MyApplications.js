import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getTutorApplications } from "../../actions/applicationActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

const { SearchBar } = Search;

class MyApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      help: false,
    };
  }

  componentDidMount() {
    this.props.getTutorApplications();
  }

  onApplyClick(id) {
    this.props.postApplication(id);
  }

  render() {
    const { applications } = this.props.application;
    let applicationTable;

    //Data for Table
    const entries = applications ? applications : [];

    var newArray = entries.filter((el) => {
      // if (el.course) {
      //   if (el.course.semester) {
      //     if (el.course.semester.courseto) {
      //       return new Date(Date.now()) < new Date(el.course.semester.to);
      //     }
      //   }
      // }
      return el;
    });

    function betrachtenButton(cell, row, course, rowIndex, formatExtraData) {
      if (row.status === "Applied") {
        return (
          <Link to={`/updateapplication/${row._id}`} className="btn btn-info">
            Edit
          </Link>
        );
      }
    }

    var help;
    if (this.state.help === true) {
      help = (
        <div>
          <h6>
            Here you can see all your Applications: If the Status is "Accepted"
            you have been accepted to be a tutor for this course. If the status
            is "Contract" a contract has been created for you - Check "My
            Contracts"
          </h6>
          <hr />
        </div>
      );
    }

    const prioFormatter = (value, cell, row, rowIndex, formatExtraData) => {
      if (value === "3") {
        return "High";
      } else if (value === "2") {
        return "Medium";
      } else if (value === "1") {
        return "Low";
      }
    };

    if (applications && applications.length > 0) {
      const columns = [
        {
          dataField: "course.metacourse.name",
          text: "Course",
          sort: true,
        },
        {
          dataField: "course.metacourse.module",
          text: "Module",
          sort: true,
        },
        {
          dataField: "grade",
          text: "My Grade",
          sort: true,
        },
        {
          dataField: "priority",
          text: "Priority",
          sort: true,
          formatter: prioFormatter,
        },
        {
          dataField: "status",
          text: "Status",
          sort: true,
        },
        {
          text: "Edit",
          header: "Edit",
          id: "links",
          formatter: betrachtenButton,
        },
      ];

      applicationTable = (
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={newArray}
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
              />
            </div>
          )}
        </ToolkitProvider>
      );
    } else {
      applicationTable = (
        <div>
          <hr />
          <h3 className="text-center">
            You have not applied yet for an open position
          </h3>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to={"/dashboard"} className={"btn btn-light"}>
              back
            </Link>
            <h1 className="display-4 text-center">My Applications</h1>

            {applicationTable}
          </div>
        </div>
      </div>
    );
  }
}

MyApplications.propTypes = {
  getTutorApplications: PropTypes.func.isRequired,
  getCoursesForApplication: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
  course: state.course,
});

export default connect(mapStateToProps, {
  getTutorApplications,
})(MyApplications);
