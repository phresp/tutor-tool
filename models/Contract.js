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
  contractstart: {
    type: Date,
  },
  contractend: {
    type: Date,
  },
  hours: {
    type: Number,
  },
  degree: {
    type: String,
  },
  newcontract: {
    type: String,
  },
  merkblatt: {
    type: String,
    default: "fehlt",
  },
  einstellungsvorschlag: {
    type: String,
    default: "fehlt",
  },
  versicherungspflicht: {
    type: String,
    default: "fehlt",
  },
  scientology: {
    type: String,
    default: "fehlt",
  },
  verfassungstreue: {
    type: String,
    default: "fehlt",
  },
  immatrikulationsbescheinigung: {
    type: String,
    default: "fehlt",
  },
  aufenthaltstitel: {
    type: String,
    default: "fehlt",
  },
  krankenkassenbescheinigung: {
    type: String,
    default: "fehlt",
  },
  personalbogenbezuegestelle: {
    type: String,
    default: "fehlt",
  },
  personalbogenstudierende: {
    type: String,
    default: "fehlt",
  },
  sozialversicherungsausweis: {
    type: String,
    default: "fehlt",
  },
  steuerId: {
    type: String,
    default: "fehlt",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Contract = mongoose.model("contract", ContractSchema);
