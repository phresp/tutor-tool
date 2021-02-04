import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getInvitationKey } from "../../actions/authActions";

class AdvisorInvite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      disabled: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth) {
      this.setState({ key: nextProps.auth.key });
    }
  }

  onSubmit(e) {
    this.setState({ disabled: true });
    this.props.getInvitationKey();
  }
  //TODO: CHANGE LINK
  render() {
    const { key } = this.state;
    var link;
    if (this.state.key) {
      link = (
        <h5 className={"text-center"}>
          localhost:8000/advisorregistration/{this.state.key}
        </h5>
      );
    }
    return (
      <div className="createSemester">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/dashboard"} className={"btn btn-light"}>
                back
              </Link>
              <h1 className="display-4 text-center">
                Einladungslink erstellen
              </h1>
              {link}
              <button
                onClick={this.onSubmit.bind(this)}
                className="btn btn-success col-sm-12 col-md-12 col-lg-12 col-xl-12"
                disabled={this.state.disabled}
              >
                {" "}
                Einladungslink erstellen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdvisorInvite.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { getInvitationKey })(
  withRouter(AdvisorInvite)
);
