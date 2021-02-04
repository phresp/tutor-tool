const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const InvitationSchema = new Schema({
  invitationkey: {
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
});

module.exports = Invitation = mongoose.model("invitations", InvitationSchema);
