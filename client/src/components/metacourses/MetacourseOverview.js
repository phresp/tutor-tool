import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getMetacourses } from "../../actions/metacourseActions";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";

const { SearchBar } = Search;

class MetacourseOverview extends Component {
  componentWillMount() {
    this.props.getMetacourses();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { metacourses } = this.props.metacourse;
    const metaArray = metacourses ? metacourses : [];

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/edit-metacourse/${row._id}`} className="btn btn-info">
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
        text: "Metacourse",
        sort: true,
      },
      {
        dataField: "scheme",
        text: "Scheme",
        sort: true,
      },
      {
        dataField: "fondsnumber",
        text: "Fondsnumber",
        sort: true,
      },
      {
        dataField: "costcentre",
        text: "Costcentre",
        sort: true,
      },
      {
        dataField: "abbreviation",
        text: "Abbreviation:",
        sort: true,
      },
      {
        dataField: "module",
        text: "Module",
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
      <div className="Metacourse Overview">
        <div className="container-fluid">
          <Link to={"/dashboard"} className={"btn btn-light"}>
            back
          </Link>
          <h1 className={"display-4"}>Metacourse Overview</h1>
          <Link to="/create-metacourse" className="btn btn-info">
            <i className="fas fa-user-circle text-primary"></i> New Metacourse
          </Link>
          <h6></h6>
          <ToolkitProvider
            keyField="id"
            data={metaArray}
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

MetacourseOverview.propTypes = {
  getMetacourses: PropTypes.func.isRequired,
  metacourse: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  metacourse: state.metacourse,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMetacourses })(
  withRouter(MetacourseOverview)
);
