import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import isEmpty from "../../validation/is-empty";

import { getSemesters } from "../../actions/semesterActions";
import { getTemplates, sendMail } from "../../actions/mailActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class SendMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: "",
      template: "",
      prevstate: "",
      to: "",
      text: "",
      subject: "",
      type: "single",
      semesters: "",
      semester: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onTemplateChange = this.onTemplateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getTemplates();
    this.props.getSemesters();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.semester) {
      const { semesters } = nextProps.semester;
      this.setState({
        semesters: semesters,
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
      semester: this.state.semester,
    };

    this.props.sendMail(mailData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onTemplateChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    var { errors, templates, semesters } = this.state;

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
        value: el._id,
      };
    });

    templateOptions.unshift({
      label: "Vorlage auswählen",
      value: "",
    });

    if (this.state.template !== this.state.prevstate) {
      if (this.state.template !== "") {
        this.state.templates.find((element) => {
          if (element._id === this.state.template) {
            this.setState({
              subject: element.subject,
              text: element.text,
              prevstate: element._id,
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

    //Select options for Status
    const typeOptions = [
      { label: "Einzel E-Mail", value: "single" },
      { label: "Alle Tutoren", value: "all" },
      { label: "Alle aktiven Übungsleiter", value: "alladvisor" },
      { label: "Alle unvollständigen Verträge", value: "allincomplete" },
      { label: "Alle mit Vertrag in Semester", value: "allcontractsem" },
    ];

    if (this.state.type === "all" && this.state.to !== "Alle Tutoren") {
      this.state.to = "Alle Tutoren";
    }

    if (
      this.state.type === "alladvisor" &&
      this.state.to !== "Alle aktiven Übungsleiter"
    ) {
      this.state.to = "Alle aktiven Übungsleiter";
    } else if (
      this.state.type === "allincomplete" &&
      this.state.to !== "Alle unvollständigen Verträge"
    ) {
      this.state.to = "Alle unvollständigen Verträge";
    } else if (
      this.state.type === "allcontractsem" &&
      this.state.to !== "Alle mit Vertrag in Semester"
    ) {
      this.state.to = "Alle mit Vertrag in Semester";
    }
    //Select options for semester
    if (!semesters) {
      semesters = [];
    }
    const semesterOptions = semesters.map((el) => {
      return { label: el.name, value: el._id };
    });
    semesterOptions.unshift({ label: "Semester auswählen", value: "" });

    //Semester Selection
    var semesterSelection;
    if (this.state.type === "allcontractsem") {
      semesterSelection = (
        <div>
          <label htmlFor="inputStudent">Semester auswählen</label>
          <SelectListGroup
            placeholder="Semester"
            onChange={this.onTemplateChange}
            value={this.state.semester}
            name="semester"
            error={errors.semester}
            options={semesterOptions}
          />
        </div>
      );
    }

    return (
      <div className="SendMail">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/dashboard"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Email versenden</h1>
              <label htmlFor="inputStudent">Email Typ</label>
              <SelectListGroup
                placeholder="Mail Typ"
                onChange={this.onTemplateChange}
                value={this.state.type}
                name="type"
                error={errors.type}
                options={typeOptions}
              />
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
              {semesterSelection}
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

SendMail.propTypes = (state) => ({
  mail: PropTypes.object.isRequired,
  semester: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  mail: state.mail,
  semester: state.semester,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getTemplates,
  sendMail,
  getSemesters,
})(withRouter(SendMail));
