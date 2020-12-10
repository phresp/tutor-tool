const isEmpty = require("../../validation/is-empty");

const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Application Model
const Application = require("../../models/Application");

//Load Profile Model
const Profile = require("../../models/Profile");

//Load User model
const User = require("../../models/User");

//Load Contract model
const Contract = require("../../models/Contract");

// @route   GET /api/contract/test
// @desc    Test application route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Contrtact Works" }));

// @route   GET /api/contract/
// @desc    GET contracts of current user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Contract.find({ user: req.user.id })
      .populate({
        path: "course",
        select: { semester: 1, metacourse: 2 },
        populate: {
          path: "semester",
        },
        populate: {
          path: "metacourse",
          select: { name: 1, abbreviation: 2, module: 3 },
        },
      })
      .populate({ path: "application" })
      .populate({ path: "user", select: { email: 1 } })
      .then((contracts) => {
        if (!contracts) {
          errors.nocontract = "There are no contracts yet";
          return res.status(404).json(errors);
        }
        res.send(contracts);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET /api/contract/all
// @desc    GET all Contracts
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Contract.find()
      .populate({
        path: "course",
        select: { semester: 1, metacourse: 2 },
        populate: {
          path: "semester",
        },
        populate: {
          path: "metacourse",
          select: { name: 1, abbreviation: 2, module: 3 },
        },
      })
      .populate({ path: "application" })
      .populate({ path: "user", select: { email: 1 } })
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

module.exports = router;
