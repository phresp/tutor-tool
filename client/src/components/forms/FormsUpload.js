import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";

import isEmpty from "../../validation/is-empty";
import SelectListGroup from "../common/SelectListGroup";

class FormsUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      file: null,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const fileData = {
      name: this.state.name,
      file: this.state.file,
    };

    this.props.uploadFile(fileData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    //Select options for status of contract
    const fileNameOptions = [
      { label: "Merkblatt", value: "Merkblatt" },
      { label: "Einstellungsvorschlag", value: "Einstellungsvorschlag" },
      {
        label: "Feststellung der Versicherungspflicht",
        value: "Versicherungspflicht",
      },
      { label: "Fragebogen zu Scientology", value: "Scientology" },
      { label: "Fragebogen zur Verfassungstreue", value: "Verfassungstreue" },
      { label: "Personalbogen Bezuegestelle", value: "Bezuegestelle" },
      {
        label: "Personalbogen Studierende",
        value: "Personalbogen Studierende",
      },
    ];

    return (
      <div className="uploadForm">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/forms-administration"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Upload Form</h1>

              <form onSubmit={this.onSubmit}>
                <label htmlFor="filename">File to Upload:</label>
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
});

const mapStateToProps = (state) => ({
  forms: state.metacourse,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(withRouter(FormsUpload));
