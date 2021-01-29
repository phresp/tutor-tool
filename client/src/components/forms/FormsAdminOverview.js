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
    // Get Dates from Props
    var merkblattData = { date: "noch kein Upload" };
    var einstellungsData = { date: "noch kein Upload" };
    var versicherungData = { date: "noch kein Upload" };
    var scientology = { date: "noch kein Upload" };
    var verfassungData = { date: "noch kein Upload" };
    var bezuegeData = { date: "noch kein Upload" };
    var personalData = { date: "noch kein Upload" };
    var stipendiumData = { date: "noch kein Upload" };

    if (Array.isArray(this.props.forms.forms)) {
      var formsArray = this.props.forms.forms;

      merkblattData = formsArray.find((obj) => {
        return obj.name === "MerkblattTutorbetrieb.pdf";
      });
      if (!merkblattData) {
        merkblattData = { date: "x" };
      }
      einstellungsData = formsArray.find((obj) => {
        return obj.name === "Einstellungsvorschlag.pdf";
      });
      if (!einstellungsData) {
        einstellungsData = { date: "noch kein Upload" };
      }
      versicherungData = formsArray.find((obj) => {
        return obj.name === "Versicherungspflicht.pdf";
      });
      if (!versicherungData) {
        versicherungData = { date: "noch kein Upload" };
      }
      scientology = formsArray.find((obj) => {
        return obj.name === "Scientology.pdf";
      });
      if (!scientology) {
        scientology = { date: "noch kein Upload" };
      }
      verfassungData = formsArray.find((obj) => {
        return obj.name === "Verfassungstreue.pdf";
      });
      if (!verfassungData) {
        verfassungData = { date: "noch kein Upload" };
      }
      bezuegeData = formsArray.find((obj) => {
        return obj.name === "PersonalbogenBezuegestelle.pdf";
      });
      if (!bezuegeData) {
        bezuegeData = { date: "noch kein Upload" };
      }
      personalData = formsArray.find((obj) => {
        return obj.name === "PersonalbogenStudierende.pdf";
      });
      if (!personalData) {
        personalData = { date: "noch kein Upload" };
      }
      stipendiumData = formsArray.find((obj) => {
        return obj.name === "Stipendiumsbescheinigung.pdf";
      });
      if (!stipendiumData) {
        stipendiumData = { date: "noch kein Upload" };
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to={"/dashboard"} className={"btn btn-light"}>
              back
            </Link>

            <h1 className="display-4 text-center">Formulare</h1>
            <Link
              to={"/form-upload"}
              className="btn btn-primary display-4 text-center"
            >
              neues Formular
            </Link>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Formular</th>
                  <th scope="col">Download</th>
                  <th scope="col">Letztes Update</th>
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
                  <th scope="row">{merkblattData.date}</th>
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
                  <th scope="row">{einstellungsData.date}</th>
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
                  <th scope="row">{versicherungData.date}</th>
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
                  <th scope="row">{scientology.date}</th>
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
                  <th scope="row">{verfassungData.date}</th>
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
                  <th scope="row">{bezuegeData.date}</th>
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
                  <th scope="row">{personalData.date}</th>
                </tr>

                <tr>
                  <th scope="row">Stipendiumsbescheinigung</th>
                  <td>
                    <button
                      type="button"
                      onClick={this.onDownloadClick.bind(
                        this,
                        "Stipendiumsbescheinigung"
                      )}
                      className="btn btn-info"
                    >
                      Download
                    </button>
                  </td>
                  <th scope="row">{stipendiumData.date}</th>
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
