const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

//Load Profile Model
const Profile = require("../../models/Profile");

//Load User model
const User = require("../../models/Profile");

//Load Validation
const validateProfileInput = require("../../validation/profile");

// @route   GET /api/profile/test
// @desc    Tess users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET /api/profile/
// @desc    GET Profile of current User
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.send(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   POST /api/profile
// @desc    Create or Update User Profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate Input fields
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    //Get Body Fields
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.lastname = req.body.lastname;
    profileFields.firstname = req.body.firstname;
    profileFields.sex = req.body.sex;
    profileFields.matrikelnummer = req.body.matrikelnummer;
    profileFields.fieldofstudy = req.body.fieldofstudy;
    profileFields.birthday = req.body.birthday;
    profileFields.nationality = req.body.nationality;
    profileFields.picture = req.body.picture;
    profileFields.vita = req.body.vita;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        //Update Profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then((profile) => res.send(profile))
          .catch((err) => res.status(404).jason(err));
      } else {
        //Create Profile
        new Profile(profileFields)
          .save()
          .then((profile) => res.send(profile))
          .catch((err) => res.status(400).json(err));
      }
    });
  }
);

// @route   DELETE /api/profile
// @desc    Delete User Profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({
      user: req.user.id,
    }).then(
      User.findOneAndRemove({
        _id: req.user.id,
      }).then(() => res.json({ success: true }))
    );
  }
);

module.exports = router;
