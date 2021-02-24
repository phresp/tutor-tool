const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Application Schema
const ApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectID,
    ref: "users",
  },
  profile: {
    type: Schema.Types.ObjectID,
    ref: "profile",
  },
  course: {
    type: Schema.Types.ObjectID,
    ref: "course",
  },
  grade: {
    type: String,
  },
  details: {
    type: String,
  },
  priority: {
    type: String,
  },
  comment: {
    type: String,
  },
  commentdate: {
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
