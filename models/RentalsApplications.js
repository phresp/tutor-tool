const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Rental Applications Schema
const RentalsApplicationsSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectID,
    ref: "profile",
  },
  status: {
    type: String,
    default: "Applied",
  },
  leihobjekt: {
    ipad: {
      type: Boolean,
    },
    mikrofon: {
      type: Boolean,
    },
    wacom: {
      type: Boolean,
    },
    webcam: {
      type: Boolean,
    },
    stativ: {
      type: Boolean,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = RentalsApplications = mongoose.model(
  "rentalsapplications",
  RentalsApplicationsSchema
);
