const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Metacourse Schema
const MetacourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  scheme: {
    type: String,
    required: true,
  },
  fondsnumber: {
    type: String,
  },
  costcentre: {
    type: String,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  module: {
    type: String,
  },
});

module.exports = Metacourse = mongoose.model("metacourse", MetacourseSchema);
