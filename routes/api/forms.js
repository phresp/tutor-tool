const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
var multer = require("multer");
const moment = require("moment");

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
      Forms.findOne({ name: formFields.name }).then((form) => {
        if (form) {
          //Update Forms
          Forms.findOneAndUpdate(
            { name: formFields.name },
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
        const pdfTemplatePath = path.resolve(
          __dirname + "../../../files/forms/" + form.name
        );
        pdftk
          .input(pdfTemplatePath)
          .output()
          .then((buf) => {
            res.type("application/pdf");
            res.send(buf);
          })
          .catch((err) => {
            res.status(404).json("something wrong here" + err);
          });
      })
      .catch((err) => res.status(404).json({ profile: "There are no forms" }));
  }
);

//@route   POST /api/forms/downloadev
//@desc    POST EV
//@access  Private
router.post(
  "/downloadev",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const name = "Einstellungsvorschlag.pdf";

    var anbei8, liegtvor8;
    if (req.body.versicherungspflicht === "Liegt bei") {
      anbei8 = "Yes";
    } else if (
      req.body.versicherungspflicht === "Liegt vor" ||
      req.body.versicherungspflicht === "Bereits Vorhanden"
    ) {
      liegtvor8 = "Yes";
    }

    //Scientology
    var anbei15, liegtvor15;
    if (req.body.scientology === "Liegt bei") {
      anbei15 = "Yes";
    } else if (req.body.scientology === "Liegt vor") {
      liegtvor15 = "Yes";
    }

    //Verfassungstreue
    var anbei9, liegtvor9;
    if (req.body.verfassungstreue === "Liegt bei") {
      anbei9 = "Yes";
    } else if (req.body.verfassungstreue === "Liegt vor") {
      liegtvor9 = "Yes";
    }

    //Immatrikulationsbescheinigung
    var anbei3, liegtvor3;
    if (req.body.verfassungstreue === "Liegt bei") {
      anbei3 = "Yes";
    } else if (req.body.verfassungstreue === "Liegt vor") {
      liegtvor3 = "Yes";
    }

    //Reisepass
    var anbei11, liegtvor11;
    if (req.body.reisepass === "Liegt bei") {
      anbei11 = "Yes";
    } else if (req.body.reisepass === "Liegt vor") {
      liegtvor11 = "Yes";
    }

    //Krankenkassenbescheinigung
    var anbei4, liegtvor4;
    if (req.body.krankenkassenbescheinigung === "Liegt bei") {
      anbei4 = "Yes";
    } else if (req.body.krankenkassenbescheinigung === "Liegt vor") {
      liegtvor4 = "Yes";
    }

    //Personalbogen Studierende
    var anbei7, liegtvor7;
    if (req.body.personalbogenstudierende === "Liegt bei") {
      anbei7 = "Yes";
    } else if (req.body.personalbogenstudierende === "Liegt vor") {
      liegtvor7 = "Yes";
    }

    //Personalbogen Bezügestelle
    var anbei6, liegtvor6;
    if (req.body.personalbogenbezuegestelle === "Liegt bei") {
      anbei6 = "Yes";
    } else if (req.body.personalbogenbezuegestelle === "Liegt vor") {
      liegtvor6 = "Yes";
    }

    //SteuerID
    var anbei2, liegtvor2;
    if (req.body.steuerId === "Liegt bei") {
      anbei2 = "Yes";
    } else if (req.body.steuerId === "Liegt vor") {
      liegtvor2 = "Yes";
    }

    //Sozialversicherungsausweis
    var anbei5, liegtvor5;
    if (req.body.sozialversicherungsausweis === "Liegt bei") {
      anbei5 = "Yes";
    } else if (req.body.sozialversicherungsausweis === "Liegt vor") {
      liegtvor5 = "Yes";
    }

    //Stipendium
    var anbeiStipendium, liegtvorStipendium;
    if (req.body.stipendium === "Liegt bei") {
      anbeiStipendium = "Yes";
    } else if (req.body.stipendium === "Liegt vor") {
      liegtvorStipendium = "Yes";
    }
    var contractdate1 = "";
    var contractdate2 = "";
    var contractdate3 = "";

    if (req.body.contractstart && req.body.contractend) {
      contractdate1 =
        moment.utc(req.body.contractstart).format("DD.MM.YYYY") +
        " - " +
        moment.utc(req.body.contractend).format("DD.MM.YYYY");
    }

    if (req.body.contractstart2 && req.body.contractend2 && contractdate1) {
      contractdate2 =
        " // " +
        moment.utc(req.body.contractstart2).format("DD.MM.YYYY") +
        " - " +
        moment.utc(req.body.contractend2).format("DD.MM.YYYY");
    } else if (req.body.contractstart2 && req.body.contractend2) {
      contractdate2 =
        moment.utc(req.body.contractstart2).format("DD.MM.YYYY") +
        " - " +
        moment.utc(req.body.contractend2).format("DD.MM.YYYY");
    }

    if (
      req.body.contractstart3 &&
      req.body.contractend3 &&
      (contractdate1 || contractdate2)
    ) {
      contractdate3 =
        " // " +
        moment.utc(req.body.contractstart3).format("DD.MM.YYYY") +
        " - " +
        moment.utc(req.body.contractend3).format("DD.MM.YYYY");
    } else if (req.body.contractstart3 && req.body.contractend3) {
      contractdate3 =
        moment.utc(req.body.contractstart3).format("DD.MM.YYYY") +
        " - " +
        moment.utc(req.body.contractend3).format("DD.MM.YYYY");
    }

    var zeitraum = contractdate1 + contractdate2 + contractdate3;

    var hours1 = "";
    var hours2 = "";
    var hours3 = "";

    if (req.body.hours) {
      hours1 = req.body.hours;
    }

    if (req.body.hours2) {
      hours2 = " // " + req.body.hours2;
    }

    if (req.body.hours3) {
      hours3 = " // " + req.body.hours3;
    }

    var hourstogether = hours1 + hours2 + hours3;

    const formdata = {
      Betreuer: req.body.adminlastname + ", " + req.body.adminfirstname,
      BetreuerTelefon: "+49 (0)89 289 17182",
      BetreuerEMail: "tutorbetrieb@in.tum.de",
      Postkuerzel: "Tutor-In",
      "Name 2": req.body.lastname + ", " + req.body.firstname,
      Staatsangehoerigkeit: req.body.nationality,
      Geburtsort: req.body.birthplace,
      Geburtsland: req.body.countryofbirth,
      Geburtsdatum: moment.utc(req.body.birthday).format("DD.MM.YYYY"),
      Taetigkeit: "Tutor für " + req.body.module + ": " + req.body.courseabb,
      "Zeitraum 2": zeitraum,
      "StdWoche 2": hourstogether,
      Fonds: req.body.fondsnumber,
      Kostenstelle_3: req.body.costcentre,
      "aus Studienbeitragsmassnahme": req.body.scheme,
      anbei8: anbei8,
      anbei15: anbei15,
      anbei9: anbei9,
      anbei3: anbei3,
      anbei11: anbei11,
      anbei4: anbei4,
      anbei7: anbei7,
      anbei6: anbei6,
      anbei2: anbei2,
      anbei5: anbei5,
      anbeiStipendium: anbeiStipendium,
      liegtvor8: liegtvor8,
      liegtvor15: liegtvor15,
      liegtvor9: liegtvor9,
      liegtvor3: liegtvor3,
      liegtvor11: liegtvor11,
      liegtvor4: liegtvor4,
      liegtvor7: liegtvor7,
      liegtvor6: liegtvor6,
      liegtvor2: liegtvor2,
      liegtvor5: liegtvor5,
      liegtvorStipendium: liegtvorStipendium,
      "Muenchen den": moment.utc(Date.now()).format("DD.MM.YYYY"),
    };
    Forms.findOne({ name: name })
      .then((form) => {
        if (!form) {
          errors.forms = "There are no forms";
          return res.status(401).json(errors);
        }
        const pdfTemplatePath = path.resolve(
          __dirname + "../../../files/forms/" + form.name
        );
        pdftk
          .input(pdfTemplatePath)
          .fillForm(formdata)
          .output()
          .then((buf) => {
            res.type("application/pdf");
            res.send(buf);
          })
          .catch((err) => {
            res.status(402).json("something wrong here" + err);
          });
      })
      .catch((err) => res.status(404).json({ profile: "There are no forms" }));
  }
);

module.exports = router;
