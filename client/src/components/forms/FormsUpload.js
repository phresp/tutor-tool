import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";

import SelectListGroup from "../common/SelectListGroup";
import { uploadFile } from "../../actions/formsActions";

class FormsUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectedFile: null,
      disabledSubmit: true,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append("file", this.state.selectedFile, this.state.name);
    fileData.append("name", this.state.name);
    const formsData = {
      name: this.state.name,
      fileData: fileData,
    };
    this.props.uploadFile(fileData, this.props.history);
  }

  onChangeHandler = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    //Select options for status of contract
    const fileNameOptions = [
      { label: "* Formular auswählen", value: "" },
      { label: "Merkblatt", value: "MerkblattTutorbetrieb" },
      { label: "Einstellungsvorschlag", value: "Einstellungsvorschlag" },
      {
        label: "Feststellung der Versicherungspflicht",
        value: "Versicherungspflicht",
      },
      { label: "Fragebogen zu Scientology", value: "Scientology" },
      { label: "Fragebogen zur Verfassungstreue", value: "Verfassungstreue" },
      {
        label: "Personalbogen Bezuegestelle",
        value: "PersonalbogenBezuegestelle",
      },
      {
        label: "Personalbogen Studierende",
        value: "PersonalbogenStudierende",
      },
      {
        label: "Stipendiumsbescheinigung",
        value: "Stipendiumsbescheinigung",
      },
    ];
    if (
      this.state.name &&
      this.state.selectedFile &&
      this.state.disabledSubmit
    ) {
      this.setState({
        disabledSubmit: false,
      });
    }

    return (
      <div className="uploadForm">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/forms-administration"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Formular Upload</h1>

              <form onSubmit={this.onSubmit}>
                <label htmlFor="filename">File zum Upload:</label>
                <SelectListGroup
                  placeholder="Filename"
                  onChange={this.onChange}
                  value={this.state.name}
                  name="name"
                  error={errors.name}
                  options={fileNameOptions}
                />
                <input
                  type="file"
                  name="file"
                  onChange={this.onChangeHandler}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                  disabled={this.state.disabledSubmit}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FormsUpload.propTypes = (state) => ({
  forms: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  uploadFile: PropTypes.func.isRequired,
});

const mapStateToProps = (state) => ({
  forms: state.metacourse,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { uploadFile })(
  withRouter(FormsUpload)
);
