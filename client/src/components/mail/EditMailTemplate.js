import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import isEmpty from "../../validation/is-empty";

import { getTemplateById, editTemplate } from "../../actions/mailActions";
import TextFieldGroup from "../common/TextFieldGroup";

class EditMailTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      text: "",
      subject: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getTemplateById(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.mail.template) {
      const template = nextProps.mail.template;
      //If template field does not exist make empty string
      template.name = !isEmpty(template.name) ? template.name : "";
      template.subject = !isEmpty(template.subject) ? template.subject : "";
      template.text = !isEmpty(template.text) ? template.text : "";

      this.setState({
        name: template.name,
        subject: template.subject,
        text: template.text,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const templateData = {
      name: this.state.name,
      text: this.state.text,
      subject: this.state.subject,
    };

    this.props.editTemplate(
      this.props.match.params.id,
      templateData,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="editMailTemplate">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/mail-overview"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Vorlage Bearbeiten</h1>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Vorlage Bezeichnung"
                  onChange={this.onChange}
                  value={this.state.name}
                  name="name"
                  error={errors.name}
                  info="Vorlage Bezeichnung"
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

EditMailTemplate.propTypes = (state) => ({
  mail: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  mail: state.mail,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { getTemplateById, editTemplate })(
  withRouter(EditMailTemplate)
);
