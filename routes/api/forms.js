const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
var multer = require("multer");

const pdftk = require("node-pdftk");
const fs = require("fs");
const path = require("path");

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
    var formFields = {};
    formFields.lastchange = req.user.id;
    formFields.date = Date.now();
    formFields.name = "";
    formFields.path = "";
    var file = {};
    //Form upload Setup

    var storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "../../../files/forms");
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname + ".pdf");
      },
    });

    var upload = multer({ storage: storage }).single("file");
    //Get Body Fields

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      formFields.name = req.file.filename;
      formFields.path = req.file.path;

      //Insert Form Data into MongoDB
      Forms.findOne({ name: req.body.name }).then((form) => {
        if (form) {
          //Update Forms
          Forms.findOneAndUpdate(
            { name: req.body.name },
            { $set: formFields },
            { new: true }
          )
            .then((form) => res.send(form))
            .catch((err) => res.status(404).jason(err));
        } else {
          //Create Forms
          new Forms(formFields)
            .save()
            .then((form) => res.send(form))
            .catch((err) => res.status(400).json(err));
        }
      });
    });
  }
);

//@route   GET /api/forms/download
//@desc    GET Form
//@access  Private
router.post(
  "/download",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const name = req.body.name + ".pdf";
    Forms.findOne({ name: name })
      .then((form) => {
        if (!form) {
          errors.forms = "There are no forms";
          return res.status(404).json(errors);
        }
        const pdfTemplatePath = form.path;
        pdftk
          .input(pdfTemplatePath)
          .output()
          .then((buf) => {
            res.type("application/pdf");
            res.send(buf);
          })
          .catch((err) => {
            res.status(404).json("something wrong here" + { err });
          });
      })
      .catch((err) => res.status(404).json({ profile: "There are no forms" }));
  }
);

module.exports = router;
