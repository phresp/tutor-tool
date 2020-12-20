const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lastchange: {
    type: Schema.Types.ObjectID,
    ref: "users",
  },
});

module.exports = Forms = mongoose.model("forms", FormsSchema);
