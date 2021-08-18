const isEmpty = require("../../validation/is-empty");

const express = require("express");
const router = express.Router();
const passport = require("passport");

const Application = require("../../models/Application");

//Load Profile Model
const Profile = require("../../models/Profile");

//Load User model
const User = require("../../models/User");

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

    Application.find({ user: req.user.id })
      .populate({
        path: "course",
        select: { metacourse: 1 },
        populate: {
          path: "metacourse",
          select: { name: 1, abbreviation: 2, module: 3 },
        },
      })
      .populate({
        path: "course",
        select: { semester: 2 },
        populate: {
          path: "semester",
        },
      })
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

// @route   GET /api/application/:id
// @desc    GET Application for course of current user
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Application.findOne({ user: req.user.id, course: req.params.id })
      .then((application) => {
        if (!application) {
          errors.noapplication = "There is no application for the course yet";
          return res.status(404).json(errors);
        }
        res.send(application);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET /api/application/apply/:id
// @desc    GET Application of ApplicationID for course of current user
// @access  Private
router.get(
  "/apply/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Application.findOne({ _id: req.params.id })
      .populate({
        path: "course",
        select: { metacourse: 1 },
        populate: {
          path: "metacourse",
          select: { name: 1, abbreviation: 2, module: 3 },
        },
      })
      .populate({
        path: "course",
        select: { semester: 2 },
        populate: {
          path: "semester",
        },
      })
      .populate("profile")
      .populate("user", ["email"])
      .then((application) => {
        if (!application) {
          errors.noapplication = "There is no application for the course yet";
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

// @route   GET api/application/course/:id
// @desc    Get all Applications for course
// @access  Private
router.get(
  "/course/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Application.find({ course: req.params.id })
      .populate("profile")
      .then((applications) => {
        if (!applications) {
          errors.application = "There are no applications";
          return res.status(404).json(errors);
        }
        res.json(applications);
      })
      .catch((err) => {
        res.status(404).json({ application: "There are no applications" });
      });
  }
);

// @route   POST /api/application/:id
// @desc    POST Application for course
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const errors = {};
      const newApp = {
        user: req.user.id,
        profile: profile.id,
        course: req.params.id,
        grade: req.body.grade,
        priority: req.body.priority,
        details: req.body.details,
      };
      Application.findOne({
        user: req.user.id,
        course: req.params.id,
      }).then((application) => {
        if (application) {
          //Update Application
          Application.findOneAndUpdate(
            { user: req.user.id, course: req.params.id },
            { $set: newApp },
            { new: true }
          )
            .then((application) => res.send(application))
            .catch((err) => res.status(404).json(err));
        } else {
          //Create Application
          new Application(newApp)
            .save()
            .then((application) => res.send(application))
            .catch((err) => res.status(400).json(err));
        }
      });
    });
  }
);

// @route   POST /api/application/update/:id
// @desc    POST Applicationupdate for application
// @access  Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const updateApp = {
      grade: req.body.grade,
      priority: req.body.priority,
      details: req.body.details,
    };
    Application.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateApp },
      { new: true }
    )
      .then((application) => res.send(application))
      .catch((err) => res.status(404).json(err));
  }
);

// @route   POST /api/application/comment/:id
// @desc    POST Comment for application
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const commentApp = {
      comment: req.body.comment,
      commentdate: Date.now(),
    };
    Application.findOneAndUpdate(
      { _id: req.params.id },
      { $set: commentApp },
      { new: true }
    )
      .then((application) => res.send(application))
      .catch((err) => res.status(404).json(err));
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
      _id: req.params.id,
    })
      .then((application) => {
        //Delete
        if (application.status === "Applied") {
          application
            .remove()
            .then(() => res.status(200).json({ success: true }));
        } else {
          res
            .status(400)
            .json({ wrongapplicationstatus: "Wrong Application Status" });
        }
      })
      .catch((err) => {
        res.status(404).json({ applicationnotfound: "Application not found" });
      });
  }
);

// @route   POST /api/application/accept/:id
// @desc    POST Applicationupdate for course
// @access  Private
router.post(
  "/accept/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    if (!(req.user.role === ("Admin" || "Supervisor"))) {
      errors.application = "Unzureichende Berechtigung";
      return res.status(401).json(errors.application);
    }
    const updateApp = {
      status: "Accepted",
    };
    Application.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateApp },
      { new: true }
    )
      .then((applications) => res.send(applications))
      .catch((err) => res.status(404).json(err));
  }
);

// @route   POST /api/application/decline/:id
// @desc    POST Applicationupdate for course
// @access  Private
router.post(
  "/decline/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const updateApp = {
      status: "Declined",
    };
    Application.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateApp },
      { new: true }
    )
      .then((applications) => res.send(applications))
      .catch((err) => res.status(404).json(err));
  }
);

// @route   POST /api/application/applied/:id
// @desc    POST Applicationupdate for course
// @access  Private
router.post(
  "/applied/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    if (!(req.user.role === ("Admin" || "Supervisor"))) {
      errors.application = "Unzureichende Berechtigung";
      return res.status(401).json(errors.application);
    }
    const updateApp = {
      status: "Applied",
    };
    Application.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateApp },
      { new: true }
    )
      .then((applications) => res.send(applications))
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
