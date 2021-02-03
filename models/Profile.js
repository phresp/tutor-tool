const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectID,
    ref: "users",
  },
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  matrikelnummer: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  birthplace: {
    type: String,
  },
  countryofbirth: {
    type: String,
  },
  nationality: {
    type: String,
  },
  nationality2: {
    type: String,
  },
  vita: {
    type: String,
  },
  aufenthaltend: {
    type: Date,
  },
  stipendiumend: {
    type: Date,
  },
  currentfieldofstudy: {
    type: String,
  },
  degree: {
    type: String,
  },

  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
