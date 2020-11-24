const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Application Schema
const ApplicationSchema = new Schema({
  tutor: {
    type: Schema.Types.ObjectID,
    ref: "user",
  },
  course: {
    type: Schema.Types.ObjectID,
    ref: "course",
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
});

module.exports = Application = mongoose.model("application", ApplicationSchema);
