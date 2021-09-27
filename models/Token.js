const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const TokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  usage: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "users",
    required: true,
  },
});

module.exports = Token = mongoose.model("tokens", TokenSchema);
