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
  constructor(props) {
    super(props);
    this.state = {
      fil: "0",
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.props.getCourses();
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
    const { courses } = this.props.course;
    const entries = courses ? courses : [];

    const defaultSorted = [
      {
        dataField: "status",
        order: "desc",
      },
    ];

    var courseArray = entries.filter((el) => {
      if (this.state.fil === "0") return el.status !== "Archive";
      if (this.state.fil === "Open") return el.status === "Open";
      if (this.state.fil === "Closed") return el.status === "Closed";
      if (this.state.fil === "Preparation") return el.status === "Preparation";
      if (this.state.fil === "Archive") return el.status === "Archive";
    });

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/edit-course/${row._id}`} className="btn btn-info">
          Edit
        </Link>
      );
    }

    function applicationsButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link
          to={`/course-applications/${row._id}`}
          className="btn btn-primary"
        >
          Bewerbungen
        </Link>
      );
    }

    function dateFormat(value, row, index) {
      if (value) return moment(value).format("DD/MM/YYYY");
    }

    const numberApplications = (cell, row, rowIndex, formatExtraData) => {
      if (row.applications) {
        return row.applications.length;
      }
    };

    const numberAccepted = (cell, row, rowIndex, formatExtraData) => {
      if (row.applications) {
        return row.applications.filter((x) => x.status == "Accepted").length;
      }
    };

    const numberVertrag = (cell, row, rowIndex, formatExtraData) => {
      if (row.applications) {
        return row.applications.filter((x) => x.status == "Contract").length;
      }
    };

    const statusFormatter = (value, cell, row, rowIndex, formatExtraData) => {
      if (value === "Open") {
        return "Offen";
      } else if (value === "Closed") {
        return "Geschlossen";
      } else if (value === "Preparation") {
        return "Vorbereitung";
      } else if (value === "Closed") {
        return "Geschlossen";
      } else if (value === "Archive") {
        return "Archiv";
      }
    };

    const columns = [
      {
        dataField: "metacourse[0].name",
        text: "Kurs",
        sort: true,
      },
      {
        dataField: "semester[0].name",
        text: "Semester",
        sort: true,
      },
      {
        dataField: "weeklyhourspertutor",
        text: "Wochenstunden",
        sort: true,
      },
      {
        text: "Bewerbungen",
        formatter: numberApplications,
        sort: true,
      },
      {
        text: "Angenommen",
        formatter: numberAccepted,
        sort: true,
      },
      {
        text: "Vertrag",
        formatter: numberVertrag,
        sort: true,
      },
      {
        dataField: "maxtutornumber",
        text: "Max Tutoren",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
        formatter: statusFormatter,
      },
      {
        text: "Edit",
        header: "Edit",
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
        <h1 className="display-4">Veranstaltungsübersicht</h1>
        <Link to="/create-course" className="btn btn-info">
          <i className="fas fa-user-circle text-primary"></i> Neue Veranstaltung
        </Link>
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
                Alle
              </button>
              <button
                className={
                  this.state.fil === "Open"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  this.setState({
                    fil: "Open",
                  });
                }}
              >
                {" "}
                Offen
              </button>

              <button
                className={
                  this.state.fil === "Preparation"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  this.setState({
                    fil: "Preparation",
                  });
                }}
              >
                {" "}
                Vorbereitung
              </button>

              <button
                className={
                  this.state.fil === "Closed"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  this.setState({
                    fil: "Closed",
                  });
                }}
              >
                {" "}
                Geschlossen
              </button>
              <button
                className={
                  this.state.fil === "Archive"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  this.setState({
                    fil: "Archive",
                  });
                }}
              >
                {" "}
                Archiv
              </button>
              <SearchBar {...props.searchProps} />
              <hr />
              <BootstrapTable
                {...props.baseProps}
                striped
                defaultSorted={defaultSorted}
              />
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
