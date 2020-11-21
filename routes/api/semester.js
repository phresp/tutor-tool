const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Semester = require("../../models/Semester");

const validateSemesterInput = require("../../validation/semester");

// @route   GET /api/semester/test
// @desc    Test semester route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Semester Works" }));

// @route   GET api/semester/all
// @desc    Get all Semester
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Semester.find()
      .then((semester) => {
        if (!semester) {
          errors.profile = "There are no semester";
          return res.status(404).json(errors);
        }
        res.json(semester);
      })
      .catch((err) =>
        res.status(404).json({ semester: "There are no semester" })
      );
  }
);

// @route   POST /api/semester
// @desc    Create or Update Semester
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate Input fields
    const { errors, isValid } = validateSemesterInput(req.body);
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }
    //Check if Semester Name is already there
    Semester.findOne({ name: req.body.name.toUpperCase() }).then((semester) => {
      if (semester) {
        errors.profile = "Semester already exists";
        return res.status(400).json(errors);
      } else {
        //If semester does not exist create
        //Get Body Fields
        const semesterFields = {};
        semesterFields.name = req.body.name.toUpperCase();
        semesterFields.from = req.body.from;
        semesterFields.to = req.body.to;
        semesterFields.coursefrom = req.body.coursefrom;
        semesterFields.courseto = req.body.courseto;

        //Create Semester
        new Semester(semesterFields)
          .save()
          .then((semester) => res.json(semester));
      }
    });
  }
);

module.exports = router;
