import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { deleteExperience } from "../../actions/profileActions";

class ExperienceOverview extends Component {
  render() {
    const experience = this.props.experience.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD/MM/YYYY">{moment.utc(exp.from)}</Moment> -{" "}
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="DD/MM/YYYY">{moment.utc(exp.to)}</Moment>
          )}
        </td>
      </tr>
    ));

    return (
      <div>
        <h5 className="mb-4">Experience Credentials</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th></th>
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

ExperienceOverview.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(ExperienceOverview);
