import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { changePassword } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      passwordold: "",
      password: "",
      password2: "",
      processable: true,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const newPW = {
      passwordold: this.state.passwordold,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.changePassword(newPW, this.props.history);
  }

  render() {
    //const { errors } = this.state;
    const errors = this.state.errors;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/edit-profile"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">Change your password</h1>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Old Password"
                  type="password"
                  onChange={this.onChange}
                  value={this.state.passwordold}
                  name="passwordold"
                  error={errors.passwordold}
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

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { changePassword })(
  withRouter(ChangePassword)
);
