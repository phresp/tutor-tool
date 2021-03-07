import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import isEmpty from "../../validation/is-empty";

import { getTemplates, sendMail } from "../../actions/mailActions";
import TextFieldGroup from "../common/TextFieldGroup";

class SendMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: "",
      to: "",
      text: "",
      subject: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getTemplates();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const mailData = {
      to: this.state.to,
      text: this.state.text,
      subject: this.state.subject,
    };

    this.props.sendMail(mailData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="SenndMail">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/dashboard"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Email versenden</h1>

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
  errors: PropTypes.object.isRequired,
});

const mapStateToProps = (state) => ({
  mail: state.mail,
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { getTemplates, sendMail })(
  withRouter(SendMail)
);
