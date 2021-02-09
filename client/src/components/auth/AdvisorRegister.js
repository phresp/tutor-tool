import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerAdvisor } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class AdvisorRegister extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password2: "",
      processable: true,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState((prevState) => ({
      processable: false,
    }));
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      processable: !prevState.processable,
    }));
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerAdvisor(
      newUser,
      this.props.match.params.id,
      this.props.history
    );
  }

  render() {
    //const { errors } = this.state;
    const errors = this.state.errors;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email Address"
                  type="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  name="email"
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  type="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  name="password"
                  error={errors.password}
                />

                <TextFieldGroup
                  placeholder="Confirm Password"
                  type="password"
                  onChange={this.onChange}
                  value={this.state.password2}
                  name="password2"
                  error={errors.password2}
                />

                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  disabled={this.state.processable ? "disabled" : ""}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdvisorRegister.propTypes = {
  registerAdvisor: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerAdvisor })(
  withRouter(AdvisorRegister)
);
