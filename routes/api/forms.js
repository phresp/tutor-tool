const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
var multer = require("multer");

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
//TODO: To finish POST

// @route   POST /api/forms/upload
// @desc    Create or Update Form
// @access  Private
router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Form upload Setup
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, __dirname + "../../../files/forms");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });

    var upload = multer({ storage: storage }).single("file");
    //Get Body Fields
    const formFields = {};
    formFields.lastchange = req.user.id;
    formFields.name = "aaa";
    formFields.path = "../../files/forms/todo";
    formFields.date = Date.now();
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      console.log(req.file);
      return res.status(200).send(req.file);
    });

    // Forms.findOne({ name: req.body.name }).then((form) => {
    //   if (form) {
    //     //Update Forms
    //     Forms.findOneAndUpdate(
    //       { name: req.body.name },
    //       { $set: formFields },
    //       { new: true }
    //     )
    //       .then((form) => res.send(form))
    //       .catch((err) => res.status(404).jason(err));
    //   } else {
    //     //Create Forms
    //     new Forms(formFields)
    //       .save()
    //       .then((form) => res.send(form))
    //       .catch((err) => res.status(400).json(err));
    //   }
    // });
  }
);

module.exports = router;
