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
});

module.exports = Forms = mongoose.model("forms", FormsSchema);
