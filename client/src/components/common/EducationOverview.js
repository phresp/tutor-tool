import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { deleteEducation } from "../../actions/profileActions";

class EducationOverview extends Component {
  render() {
    const education = this.props.education.map((edu) => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="DD/MM/YYYY">{moment.utc(edu.from)}</Moment> -{" "}
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="DD/MM/YYYY">{moment.utc(edu.to)}</Moment>
          )}
        </td>
      </tr>
    ));

    return (
      <div>
        <h5 className="mb-4">Education Credentials</h5>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th></th>
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(null, { deleteEducation })(EducationOverview);
