import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import isEmpty from "../../validation/is-empty";

import {
  getTemplates,
  sendContractCreationMail,
} from "../../actions/mailActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

import { getContractOfID } from "../../actions/contractActions";

class CreateContractMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: "",
      template: "",
      prevstate: "",
      firstname: "",
      lastname: "",
      gender: "",
      to: "",
      text: "",
      subject: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onTemplateChange = this.onTemplateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getContractOfID(this.props.match.params.id);
    this.props.getTemplates();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.contract.contract) {
      if (nextProps.contract.contract.user) {
        this.setState({ to: nextProps.contract.contract.user.email });
      }
      this.setState({
        firstname: nextProps.contract.contract.profile.firstname,
        lastname: nextProps.contract.contract.profile.lastname,
        gender: nextProps.contract.contract.profile.gender,
      });
    }

    if (nextProps.mail) {
      this.setState({
        templates: nextProps.mail.templates,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const mailData = {
      to: this.state.to,
      text: this.state.text,
      subject: this.state.subject,
    };

    this.props.sendContractCreationMail(
      mailData,
      this.props.contract.contract.course._id,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onTemplateChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    var { errors, templates } = this.state;

    //back Button
    var backButton = (
      <Link to={"/course-overview"} className={"btn btn-light"}>
        back
      </Link>
    );

    if (this.props.contract.contract) {
      backButton = (
        <Link
          to={`/course-applications/${this.props.contract.contract.course._id}`}
          className={"btn btn-light"}
        >
          back
        </Link>
      );
    }

    //Select options for tutors
    if (isEmpty(templates)) {
      templates = [];
    }
    templates.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    var templateOptions = templates.map((el) => {
      return {
        label: el.name,
        value: el.name,
      };
    });

    templateOptions.unshift({
      label: "Vorlage auswählen",
      value: "",
    });

    if (this.state.template !== this.state.prevstate) {
      if (this.state.template !== "") {
        this.state.templates.find((element) => {
          if (element.name === this.state.template) {
            this.setState({
              subject: element.subject,
              text: element.text,
              prevstate: element.name,
            });
          }
        });
      } else {
        this.setState({
          subject: "",
          text: "",
          prevstate: "",
        });
      }
    }

    return (
      <div className="CreateContractMail">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {backButton}
              <hr />
              <h1 className="display-4 text-center">
                Email zur Vertragserstellung
              </h1>
              <hr />
              <label htmlFor="inputStudent">Email Vorlage</label>
              <SelectListGroup
                placeholder="Mail Vorlage"
                onChange={this.onTemplateChange}
                value={this.state.template}
                name="template"
                error={errors.template}
                options={templateOptions}
              />
              <hr />
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="An"
                  onChange={this.onChange}
                  value={this.state.to}
                  name="to"
                  error={errors.to}
                  info="An"
                />

                <TextFieldGroup
                  placeholder="Betreff"
                  onChange={this.onChange}
                  value={this.state.subject}
                  name="subject"
                  error={errors.subject}
                  info="Betreff"
                />
                <TextAreaFieldGroup
                  placeholder="Text"
                  rows={"10"}
                  onChange={this.onChange}
                  value={this.state.text}
                  name="text"
                  error={errors.text}
                  info="Text"
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
CreateContractMail.propTypes = (state) => ({
  mail: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  contract: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  mail: state.mail,
  profile: state.profile,
  contract: state.contract,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getTemplates,
  sendContractCreationMail,
  getContractOfID,
})(withRouter(CreateContractMail));
