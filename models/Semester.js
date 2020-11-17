const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Semester Schema
const SemesterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  coursefrom: {
    type: Date,
    required: true,
  },
  courseto: {
    type: Date,
    required: true,
  },
});

module.exports = Semester = mongoose.model("semester", SemesterSchema);
