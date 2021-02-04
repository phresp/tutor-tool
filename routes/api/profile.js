const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

//Load Profile Model
const Profile = require("../../models/Profile");

//Load User model
const User = require("../../models/User");

//Load Validation
const validateProfileInput = require("../../validation/profile");
const validateAdvisorProfileInput = require("../../validation/advisorprofile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// @route   GET /api/profile/test
// @desc    Test profile route
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
      .populate("user", ["lastlogin"])
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

// @route   GET /api/profile/:id
// @desc    GET Profile of User
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.id })
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

// @route   GET /api/profile/profile/:id
// @desc    GET Profile of User
// @access  Private
router.get(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ _id: req.params.id })
      .populate("user", ["email", "role"])
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

// @route   GET api/profile/profiles/all
// @desc    Get all Profiles
// @access  Private
router.get(
  "/profiles/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Check authorization
    const errors = {};
    // if (!(req.user.role === "Admin" || "Supervisor")) {
    //   errors.profile = "Unzureichende Berechtigung";
    //   res.status(401).json(errors.profile);
    // }

    Profile.find()
      .populate("user", ["email", "role"])
      .then((profiles) => {
        if (!profiles) {
          errors.profile = "There are no profiles";
          return res.status(404).json(errors);
        }
        res.json(profiles);
      })
      .catch((err) =>
        res.status(404).json({ profile: "There are no profiles" })
      );
  }
);

// @route   GET api/profile/role/advisor
// @desc    Get all advisors
// @access  Private
router.get(
  "/role/advisor",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Check authorization
    const errors = {};
    User.find({ role: "Advisor" })
      .then((advisors) => {
        if (!advisors) {
          errors.profile = "There are no profiles";
          return res.status(404).json(errors);
        }
        const advisorIDs = advisors.map((el) => {
          return el._id;
        });
        Profile.find({
          user: advisorIDs,
        })
          .populate("user", ["email"])
          .then((advisorProfiles) => {
            if (!advisorProfiles) {
              errors.profile = "There are no profiles";
              return res.status(404).json(errors);
            } else {
              res.json(advisorProfiles);
            }
          });
      })
      .catch((err) =>
        res.status(404).json({ profile: "There are no advisors" })
      );
  }
);

// @route   GET api/profile/role/admin
// @desc    Get all admins
// @access  Private
router.get(
  "/role/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Check authorization
    const errors = {};
    User.find({ role: "Admin" })
      .then((admins) => {
        if (!admins) {
          errors.profile = "There are no profiles";
          return res.status(404).json(errors);
        }
        const adminIDs = admins.map((el) => {
          return el._id;
        });
        Profile.find({
          user: adminIDs,
        })
          .populate("user", ["email"])
          .then((adminProfiles) => {
            if (!adminProfiles) {
              errors.profile = "There are no profiles";
              return res.status(404).json(errors);
            } else {
              res.json(adminProfiles);
            }
          });
      })
      .catch((err) => res.status(404).json({ profile: "There are no admins" }));
  }
);

// @route   GET api/profile/role/tutor
// @desc    Get all tutors
// @access  Private
router.get(
  "/role/tutor",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Check authorization
    const errors = {};
    User.find({ role: "Student" })
      .then((tutors) => {
        if (!tutors) {
          errors.profile = "There are no profiles";
          return res.status(404).json(errors);
        }
        const tutorIDs = tutors.map((el) => {
          return el._id;
        });
        Profile.find({
          user: tutorIDs,
        })
          .populate("user", ["email"])
          .then((tutorProfiles) => {
            if (!tutorProfiles) {
              errors.profile = "There are no profiles";
              return res.status(404).json(errors);
            } else {
              res.json(tutorProfiles);
            }
          });
      })
      .catch((err) => res.status(404).json({ profile: "There are no tutors" }));
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
    profileFields.gender = req.body.gender;
    profileFields.matrikelnummer = req.body.matrikelnummer;
    profileFields.fieldofstudy = req.body.fieldofstudy;
    profileFields.birthday = req.body.birthday;
    profileFields.nationality = req.body.nationality;
    profileFields.nationality2 = req.body.nationality2;
    profileFields.birthplace = req.body.birthplace;
    profileFields.countryofbirth = req.body.countryofbirth;
    profileFields.aufenthaltend = req.body.aufenthaltend;
    profileFields.stipendiumend = req.body.stipendiumend;
    profileFields.vita = req.body.vita;
    profileFields.currentfieldofstudy = req.body.currentfieldofstudy;
    profileFields.degree = req.body.degree;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        //Update Profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then((profile) => res.send(profile))
          .catch((err) => res.status(404).json(err));
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

// @route   POST /api/profile/update/:id
// @desc    Update User Profile of ID
// @access  Private
router.post(
  "/update/:id",
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
    profileFields.gender = req.body.gender;
    profileFields.matrikelnummer = req.body.matrikelnummer;
    profileFields.fieldofstudy = req.body.fieldofstudy;
    profileFields.birthday = req.body.birthday;
    profileFields.nationality = req.body.nationality;
    profileFields.nationality2 = req.body.nationality2;
    profileFields.birthplace = req.body.birthplace;
    profileFields.countryofbirth = req.body.countryofbirth;
    profileFields.aufenthaltend = req.body.aufenthaltend;
    profileFields.stipendiumend = req.body.stipendiumend;
    profileFields.vita = req.body.vita;
    profileFields.currentfieldofstudy = req.body.currentfieldofstudy;
    profileFields.degree = req.body.degree;

    Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: profileFields },
      { new: true }
    )
      .then((profile) => res.send(profile))
      .catch((err) => res.status(404).json(err));
  }
);

// @route   POST /api/profile/advisorprofile
// @desc    Create or Update Advisor Profile
// @access  Private
router.post(
  "/advisorprofile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate Input fields
    const { errors, isValid } = validateAdvisorProfileInput(req.body);
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    //Get Body Fields
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.lastname = req.body.lastname;
    profileFields.firstname = req.body.firstname;
    profileFields.gender = req.body.gender;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        //Update Profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then((profile) => res.send(profile))
          .catch((err) => res.status(404).json(err));
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

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    //Check Validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({
      user: req.user.id,
    })
      .then((profile) => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };

        if (!newExp.to) newExp.current = true;

        //Add to experience array
        profile.experience.unshift(newExp);

        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    //Check Validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({
      user: req.user.id,
    })
      .then((profile) => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };

        if (!newEdu.to) newEdu.current = true;

        //Add to experience array
        profile.education.unshift(newEdu);

        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id,
    })
      .then((profile) => {
        // Get remove index
        const removeIndex = profile.experience
          .map((item) => item.id)
          .indexOf(req.params.exp_id);

        //Splice out of array
        profile.experience.splice(removeIndex, 1);

        //Save
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id,
    })
      .then((profile) => {
        // Get remove index
        const removeIndex = profile.education
          .map((item) => item.id)
          .indexOf(req.params.edu_id);

        //Splice out of array
        profile.education.splice(removeIndex, 1);

        //Save
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   DELETE /api/profile
// @desc    Delete User Profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id })
      .then((userP) => {
        const userFields = {
          email: Math.random().toString(36).substring(2) + userP.email,
          active: false,
        };
        User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: userFields },
          { new: true }
        )
          .then(() => res.json({ success: true }))
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
