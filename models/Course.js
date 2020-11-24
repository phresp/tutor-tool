const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Course Schema
const CourseSchema = new Schema({
  metacourse: {
    type: Schema.Types.ObjectID,
    ref: "metacourse",
  },
  semester: {
    type: Scheme.Types.ObjectID,
    ref: "semester",
  },
  studentnumber: {
    type: Number,
  },
  groupenumber: {
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
  applications: [
    {
      user: {
        type: Schema.Types.ObjectID,
        ref: "user",
      },
      grade: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        default: "Applied",
      },
    },
  ],
  admin: {
    type: Schema.Types.ObjectID,
    ref: "user",
  },
  advisor: {
    type: Schema.Types.ObjectID,
    ref: "user",
  },
});

module.exports = Course = mongoose.model("course", CourseSchema);
