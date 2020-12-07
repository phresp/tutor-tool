const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Course Schema
const CourseSchema = new Schema({
  metacourse: {
    type: Schema.Types.ObjectID,
    ref: "metacourse",
  },
  semester: {
    type: Schema.Types.ObjectID,
    ref: "semester",
  },
  studentnumber: {
    type: Number,
  },
  groupnumber: {
    type: Number,
  },
  groupsize: {
    type: Number,
  },
  tutorialhours: {
    type: Number,
  },
  homework: {
    type: Number,
  },
  exam: {
    type: Number,
  },
  midterm: {
    type: Number,
  },
  groupspertutor: {
    type: Number,
  },
  maxtutornumber: {
    type: Number,
  },
  weeklyhourspertutor: {
    type: Number,
  },
  overallhours: {
    type: Number,
  },
  from: {
    type: String,
  },
  till: {
    type: String,
  },
  weeks: {
    type: Number,
  },
  requirement: {
    type: String,
  },
  admin: {
    type: Schema.Types.ObjectID,
    ref: "user",
  },
  advisor: {
    type: Schema.Types.ObjectID,
    ref: "user",
  },
  status: {
    type: String,
    default: "Preparation",
  },
});

module.exports = Course = mongoose.model("course", CourseSchema);
