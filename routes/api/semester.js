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

// @route   GET api/semester/
// @desc    Get all Semester
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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

// @route   GET /api/semester/:id
// @desc    Get Semester by id
// @access  Private
router.get("/:id", (req, res) => {
  const errors = {};
  Semester.findOne({ _id: req.params.id })
    .then((semester) => {
      res.json(semester);
    })
    .catch((err) =>
      res.status(404).json({ semesternotfound: "Semester not found" })
    );
});

// @route   POST /api/semester
// @desc    Create
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
    if (!(req.user.role === "Admin")) {
      errors.profile = "Unzureichende Berechtigung";
      return res.status(401).json(errors.profile);
    }
    //Check if Semester Name is already there
    Semester.findOne({ name: req.body.name.toUpperCase() }).then((semester) => {
      if (semester) {
        errors.name = "Semester already exists";
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

// @route   POST api/semester/:id
// @desc    Edit Semester
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSemesterInput(req.body);
    //Check validation
    if (!isValid) {
      //If not valid, send 400 with errors
      return res.status(400).json(errors);
    }
    if (!(req.user.role === "Admin")) {
      errors.profile = "Unzureichende Berechtigung";
      return res.status(401).json(errors.profile);
    }

    Semester.findOne({ name: req.body.name.toUpperCase() }).then((semester) => {
      if (semester && semester._id != req.params.id) {
        //Above expression works but is not really nice
        errors.name = "Semester already exists";
        return res.status(400).json(errors);
      } else {
        //Get Body Fields
        const semesterFields = {};
        semesterFields.name = req.body.name.toUpperCase();
        semesterFields.from = req.body.from;
        semesterFields.to = req.body.to;
        semesterFields.coursefrom = req.body.coursefrom;
        semesterFields.courseto = req.body.courseto;

        //Update
        Semester.findOneAndUpdate(
          { _id: req.params.id },
          { $set: semesterFields },
          { new: true }
        )
          .then((semester) => res.json(semester))
          .catch((err) =>
            res.status(404).json({ nosemesterfound: "Semester not found" })
          );
      }
    });
  }
);

// @route   DELETE /api/semester/:id
// @desc    DELETE Semester
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    if (!(req.user.role === "Admin")) {
      errors.profile = "Unzureichende Berechtigung";
      return res.status(401).json(errors.profile);
    }
    Semester.findById(req.params.id)
      .then((semester) => {
        // Delete
        semester.remove().then(() => res.status(200).json({ success: true }));
      })
      .catch((err) => {
        res.status(404).json({ semesternotfound: "Semester not found" });
      });
  }
);

module.exports = router;
