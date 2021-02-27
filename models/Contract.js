const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Contract Schema
const ContractSchema = new Schema({
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
  contractstart2: {
    type: Date,
  },
  contractend2: {
    type: Date,
  },
  hours2: {
    type: Number,
  },
  contractstart3: {
    type: Date,
  },
  contractend3: {
    type: Date,
  },
  hours3: {
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
  },
  einstellungsvorschlag: {
    type: String,
  },
  versicherungspflicht: {
    type: String,
  },
  scientology: {
    type: String,
  },
  verfassungstreue: {
    type: String,
  },
  immatrikulationsbescheinigung0: {
    type: String,
  },
  immatrikulationsbescheinigung: {
    type: String,
  },
  immatrikulationsbescheinigung2: {
    type: String,
  },
  aufenthaltstitel: {
    type: String,
  },
  krankenkassenbescheinigung: {
    type: String,
  },
  personalbogenbezuegestelle: {
    type: String,
  },
  personalbogenstudierende: {
    type: String,
  },
  steuerId: {
    type: String,
  },
  reisepass: {
    type: String,
  },
  stipendium: {
    type: String,
  },
  abschlusszeugnis: {
    type: String,
  },
  lastchangeddate: {
    type: Date,
  },
  lasthandle: {
    type: String,
  },
  contractcomment: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = Contract = mongoose.model("contract", ContractSchema);
