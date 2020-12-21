import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getForms, downloadPdf } from "../../actions/formsActions";

class FormsAdminOverview extends Component {
  componentDidMount() {
    this.props.getForms();
  }

  onDownloadClick(name) {
    const formData = {
      name: name,
    };
    this.props.downloadPdf(formData);
  }

  render() {
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
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(
                        this,
                        "MerkblattTutorbetrieb"
                      )}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Einstellungsvorschlag</th>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(
                        this,
                        "Einstellungsvorschlag"
                      )}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Feststellung der Versicherungspflicht</th>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(
                        this,
                        "Versicherungspflicht"
                      )}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Fragebogen zu Scientology</th>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(this, "Scientology")}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Fragebogen zur Verfassungstreue</th>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(
                        this,
                        "Verfassungstreue"
                      )}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Personalbogen Bezuegestelle</th>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(
                        this,
                        "PersonalbogenBezuegestelle"
                      )}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Personalbogen Studierende</th>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(
                        this,
                        "PersonalbogenStudierende"
                      )}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
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

export default connect(mapStateToProps, { getForms, downloadPdf })(
  withRouter(FormsAdminOverview)
);
