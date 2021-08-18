const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Metacourse = require("../../models/Metacourse");

const validateMetacourseInput = require("../../validation/metacourse");

// @route   GET /api/metacourse/test
// @desc    Test semester route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Metacourse Works" }));

// @route   GET api/metacourse/
// @desc    Get all Mecourses
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Metacourse.find()
      .then((metacourse) => {
        if (!metacourse) {
          errors.metacourse = "There are no metacourses";
          return res.status(404).json(errors);
        }
        res.json(metacourse);
      })
      .catch((err) =>
        res.status(404).json({ metacourse: "There are no Metacourses" })
      );
  }
);

// @route   GET /api/metacourse/:id
// @desc    Get Metacourse by id
// @access  Private
router.get("/:id", (req, res) => {
  const errors = {};
  Metacourse.findOne({ _id: req.params.id })
    .then((metacourse) => {
      res.json(metacourse);
    })
    .catch((err) =>
      res.status(404).json({ metacoursenotfound: "Metacourse not found" })
    );
});

// @route   POST /api/metacourse
// @desc    Create Metacourse
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate Input fields
    const { errors, isValid } = validateMetacourseInput(req.body);
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }
    if (!(req.user.role === "Admin")) {
      errors.profile = "Unzureichende Berechtigung";
      return res.status(401).json(errors.profile);
    }
    //Check if Metacourse Name is already there
    Metacourse.findOne({ name: req.body.name.toUpperCase() }).then(
      (metacourse) => {
        if (metacourse) {
          errors.name = "Metacourse already exists";
          return res.status(400).json(errors);
        } else {
          //If Metacourse does not exist create
          //Get Body Fields
          const metacourseFields = {};
          metacourseFields.name = req.body.name;
          metacourseFields.scheme = req.body.scheme;
          metacourseFields.fondsnumber = req.body.fondsnumber;
          metacourseFields.costcentre = req.body.costcentre;
          metacourseFields.abbreviation = req.body.abbreviation;
          metacourseFields.module = req.body.module;

          //Create Metacourse
          new Metacourse(metacourseFields)
            .save()
            .then((metacourse) => res.json(metacourse));
        }
      }
    );
  }
);

// @route   POST api/metacourse/:id
// @desc    Edit Metacourse
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMetacourseInput(req.body);
    if (!(req.user.role === "Admin")) {
      errors.profile = "Unzureichende Berechtigung";
      return res.status(401).json(errors.profile);
    }
    //Check validation
    if (!isValid) {
      //If not valid, send 400 with errors
      return res.status(400).json(errors);
    }

    Metacourse.findOne({ name: req.body.name }).then((metacourse) => {
      if (metacourse && metacourse._id != req.params.id) {
        //Above expression works but is not really nice
        errors.name = "Metacourse already exists";
        return res.status(400).json(errors);
      } else {
        //Get Body Fields
        const metacourseFields = {};
        metacourseFields.name = req.body.name;
        metacourseFields.scheme = req.body.scheme;
        metacourseFields.fondsnumber = req.body.fondsnumber;
        metacourseFields.costcentre = req.body.costcentre;
        metacourseFields.abbreviation = req.body.abbreviation;
        metacourseFields.module = req.body.module;

        //Update
        Metacourse.findOneAndUpdate(
          { _id: req.params.id },
          { $set: metacourseFields },
          { new: true }
        )
          .then((metacourse) => res.json(metacourse))
          .catch((err) =>
            res.status(404).json({ nometacoursefound: "Metacourse not found" })
          );
      }
    });
  }
);

// @route   DELETE /api/metacourse/:id
// @desc    DELETE Metacourse
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
    Metacourse.findById(req.params.id)
      .then((metacourse) => {
        // Delete
        metacourse.remove().then(() => res.status(200).json({ success: true }));
      })
      .catch((err) => {
        res.status(404).json({ metacoursenotfound: "Metacourse not found" });
      });
  }
);

module.exports = router;
