import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";

import { getTemplates } from "../../actions/mailActions";

const { SearchBar } = Search;

class MailOverview extends Component {
  componentWillMount() {
    this.props.getTemplates();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { templates } = this.props.mail;
    const templateArray = templates ? templates : [];

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/edit-template/${row._id}`} className="btn btn-info">
          Edit
        </Link>
      );
    }

    const columns = [
      {
        dataField: "name",
        text: "Vorlage",
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
      <div className="Mail Overview">
        <div className="container">
          <Link to={"/dashboard"} className={"btn btn-light"}>
            back
          </Link>
          <h1 className={"display-4"}>Mail Vorlagen Übersicht</h1>
          <Link to="/create-template" className="btn btn-info">
            <i className="fas fa-user-circle text-primary"></i> Neue Vorlage
          </Link>
          <h6></h6>
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={templateArray}
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

MailOverview.propTypes = {
  getSemesters: PropTypes.func.isRequired,
  mail: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  mail: state.mail,
  auth: state.auth,
});

export default connect(mapStateToProps, { getTemplates })(
  withRouter(MailOverview)
);
