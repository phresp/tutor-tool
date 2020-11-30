const isEmpty = require("../../validation/is-empty");

const express = require("express");
const router = express.Router();
const passport = require("passport");

const Application = require("../../models/Application");

// @route   GET /api/application/test
// @desc    Test application route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Application Works" }));

// @route   GET /api/application/
// @desc    GET Applications of current user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Application.findOne({ user: req.user.id })
      .then((application) => {
        if (!application) {
          errors.noapplication = "There are no applications yet";
          return res.status(404).json(errors);
        }
        res.send(application);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/application/all
// @desc    Get all Applications
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Application.find()
      .populate("profile")
      .populate({
        path: "course",
        select: { semester: 1, metacourse: 2 },
        populate: {
          path: "semester",
        },
      })
      .then((applications) => {
        if (!applications) {
          errors.application = "There are no applications";
          return res.status(404).json(errors);
        }
        res.json(applications);
      })
      .catch((err) =>
        res.status(404).json({ application: "There are no applications" })
      );
  }
);

// @route   POST /api/application/:id
// @desc    POST Application for course
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var errors;
    const newApp = {
      user: req.user.id,
      profile: req.body.profile,
      course: req.params.id,
      grade: req.body.grade,
      details: req.body.details,
    };
    Application.findOne({
      user: req.user.id,
      course: req.params.id,
    }).then((application) => {
      if (application) {
        return res.status(404).json({ application: "Application exists" });
      } else {
        //Create Application
        new Application(newApp)
          .save()
          .then((application) => res.send(application))
          .catch((err) => res.status(400).json(err));
      }
    });
  }
);

// @route   DEL /api/application/:id
// @desc    DEL Application
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Application.findOne({
      user: req.user.id,
      course: req.params.id,
    })
      .then((application) => {
        //Delete
        application
          .remove()
          .then(() => res.status(200).json({ success: true }));
      })
      .catch((err) => {
        res.status(404).json({ applicationnotfound: "Application not found" });
      });
  }
);

module.exports = router;
