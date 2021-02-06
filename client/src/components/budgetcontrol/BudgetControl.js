import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCourseById } from "../../actions/courseActions";
import { getContractsForCourse } from "../../actions/contractActions";
import { Link } from "react-router-dom";

class BudgetControl extends Component {
  componentDidMount() {
    this.props.getCourseById(this.props.match.params.id);
    this.props.getContractsForCourse(this.props.match.params.id);
  }

  render() {
    //Coursename and Semester
    var coursename;
    var coursesem;
    if (this.props.course) {
      if (this.props.course.course) {
        if (this.props.course.course.metacourse.name) {
          coursename = this.props.course.course.metacourse.name;
        }
        if (this.props.course.course.semester.name) {
          coursesem = this.props.course.course.semester.name;
        }
      }
    }

    const diff_weeks = (dt2, dt1) => {
      var diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60 * 60 * 24 * 7;
      return Math.abs(Math.round(diff));
    };

    var numberContracts = 0;
    var overallcontracthours = 0;
    if (this.props.contract.contracts) {
      var { contracts } = this.props.contract;
      numberContracts = contracts.length;
      contracts.forEach((element) => {
        //Wochenlänge berechnen und das mal Stunden in den Wochen
        var weeks1 = 0;
        var weeks2 = 0;
        if (element.contractstart && element.contractend) {
          weeks1 = diff_weeks(
            new Date(element.contractstart),
            new Date(element.contractend)
          );
        }

        if (element.contractstart2 && element.contractend2) {
          weeks2 = diff_weeks(
            new Date(element.contractstart2),
            new Date(element.contractend2)
          );
        }
        var hours = element.hours ? element.hours : 0;
        var hours2 = element.hours2 ? element.hours : 0;

        var allhours = weeks1 * hours + weeks2 * hours2;
        overallcontracthours += allhours;
      });
    }

    //Numbers for the course
    if (this.props.course.course) {
      var { overallweeklyhours, overallhours } = this.props.course.course;
    }

    //className for Table
    var tableClassName = "table";
    var hoursTooltipp;
    if (overallcontracthours > overallhours) {
      hoursTooltipp = (
        <h3 className={"text-danger text-center"}>Vertragsstunden zu hoch</h3>
      );
      tableClassName = "table table-danger";
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to={"/course-overview"} className={"btn btn-light"}>
              back
            </Link>
            <h1 className="display-4 text-center">
              Budgetübersicht für {coursename} in {coursesem}
            </h1>
            {hoursTooltipp}
            <table className={tableClassName}>
              <thead>
                <tr>
                  <th scope="col"># Verträge</th>
                  <th scope="col">Verträge Gesamtstunden</th>
                  <th scope="col">Veranstaltung Gesamtstunden</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{numberContracts}</td>
                  <td>{overallcontracthours}</td>
                  <td>{overallhours}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

BudgetControl.propTypes = {
  getCourseById: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
  course: state.course,
  contract: state.contract,
});

export default connect(mapStateToProps, {
  getCourseById,
  getContractsForCourse,
})(BudgetControl);
