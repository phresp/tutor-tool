import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Tutor-Tool</h1>
                <hr />
                <h3>The Tutortool is currently under construction!</h3>
                <h3>
                  Please see the{" "}
                  <a
                    href="https://www.in.tum.de/fuer-studierende/tutorbetrieb-der-fakultaet-fuer-informatik/"
                    className={"text-white"}
                  >
                    Tutorbetrieb Webpage
                  </a>{" "}
                  for open positions
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
