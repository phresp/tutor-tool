const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const MailTemplateSchema = new Schema({
  name: {
    type: String,
  },
  text: {
    type: String,
  },
  subject: {
    type: String,
  },
});

module.exports = MailTemplate = mongoose.model(
  "mailtemplates",
  MailTemplateSchema
);
