const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Contract Schema
const ContractSchema = new Schema({
  tutor: {
    type: Schema.Types.ObjectID,
    ref: "user",
  },
  course: {
    type: Schema.Types.ObjectID,
    ref: "course",
  },
  application: {
    type: Schema.Types.ObjectID,
    ref: "application",
  },
  status: {
    type: String,
    default: "Applied",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Contract = mongoose.model("contract", ContractSchema);
