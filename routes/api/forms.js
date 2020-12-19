const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

//Load User model
const Forms = require("../../models/Forms");

// @route   GET /api/forms/test
// @desc    Test forms route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Forms Works" }));

// @route   GET /api/forms/all
// @desc    GET all forms
// @access  Public
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Forms.find()
      .then((forms) => {
        if (!forms) {
          errors.forms = "There are no forms";
          return res.status(404).json(errors);
        }
        res.json(forms);
      })
      .catch((err) => res.status(404).json({ profile: "There are no forms" }));
  }
);

module.exports = router;
