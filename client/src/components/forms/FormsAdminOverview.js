import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getForms } from "../../actions/formsActions";

class FormsAdminOverview extends Component {
  componentDidMount() {
    this.props.getForms();
  }
  //TODO: DownloadButton für jeweilige Forms
  render() {
    const contractdata = {};

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Link to={"/dashboard"} className={"btn btn-light"}>
              back
            </Link>

            <h1 className="display-4 text-center">Forms</h1>
            <Link
              to={"/form-upload"}
              className="btn btn-primary display-4 text-center"
            >
              Upload new Form
            </Link>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Form</th>
                  <th scope="col">Download</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Merkblatt Tutorbetrieb</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Einstellungsvorschlag</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Feststellung der Versicherungspflicht</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Fragebogen zu Scientology</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Fragebogen zur Verfassungstreue</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Personalbogen Bezuegestelle</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Personalbogen Studierende</th>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

FormsAdminOverview.propTypes = {
  getForms: PropTypes.func.isRequired,
  forms: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  forms: state.forms,
});

export default connect(mapStateToProps, { getForms })(
  withRouter(FormsAdminOverview)
);
