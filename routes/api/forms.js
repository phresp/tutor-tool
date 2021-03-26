const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
var multer = require("multer");
const moment = require("moment");
const AufenthaltsfreieCountries = require("../../config/AufenthaltCountries");
const aufenthaltfreieCountriesNoEmpty =
  AufenthaltsfreieCountries.aufenthaltfreieCountriesNoEmpty;

const pdftk = require("node-pdftk");
const fs = require("fs");
const path = require("path");

const excel = require("exceljs");
const flatten = require("flat");

const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;

//Load Forms model
const Forms = require("../../models/Forms");

//Load Contract model
const Contract = require("../../models/Contract");

//Load Course model
const Course = require("../../models/Course");

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
            .catch((err) => res.status(404).json(err));
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

    //Weiterbeschäftigung
    var optionsfeld1 = "eingestellt";
    if (req.body.newcontract === "True") {
      optionsfeld1 = "eingestellt";
    } else if (req.body.newcontract === "False") {
      optionsfeld1 = "weiterbeschaeftigt";
    }

    //Abschluss/Degree
    var gewuenschterstatus2 = "Studierende/r ohne Abschluss";
    if (req.body.degree === "None") {
      gewuenschterstatus2 = "Studierende/r ohne Abschluss";
    } else if (req.body.degree === "Bachelor") {
      gewuenschterstatus2 = "Studierende/r mit Abschluss";
    } else if (req.body.degree === "Master" || req.body.degree === "Diplom") {
      gewuenschterstatus2 = "wissenschaftliche Hilfskraft";
    }

    //Stipendium
    var stipendiumdate = "nein";
    if (req.body.stipendiumdate) {
      if (new Date(req.body.stipendiumdate) > new Date(Date.now())) {
        stipendiumdate = "ja";
      }
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
    if (req.body.immatrikulationsbescheinigung === "Liegt bei") {
      anbei3 = "Yes";
    } else if (req.body.immatrikulationsbescheinigung === "Liegt vor") {
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

    //Abschlusszeugnis
    var anbeiAbschlusszeugnis, liegtvorAbschlusszeugnis;
    if (req.body.abschlusszeugnis === "Liegt bei") {
      anbeiAbschlusszeugnis = "Yes";
    } else if (req.body.abschlusszeugnis === "Liegt vor") {
      liegtvorAbschlusszeugnis = "Yes";
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

    var staatsangehörigkeit;
    if (req.body.nationality2) {
      staatsangehörigkeit =
        req.body.nationality + " // " + req.body.nationality2;
    } else {
      staatsangehörigkeit = req.body.nationality;
    }

    var zeitraum = contractdate1 + contractdate2;

    var hours1 = "";
    var hours2 = "";

    if (req.body.hours) {
      hours1 = req.body.hours;
    }

    if (req.body.hours2) {
      hours2 = " // " + req.body.hours2;
    }

    var hourstogether = hours1 + hours2;
    var ausweis;
    if (aufenthaltfreieCountriesNoEmpty.includes(req.body.natforausweis)) {
      ausweis = "Yes";
    }
    const formdata = {
      Betreuer: req.body.adminlastname + ", " + req.body.adminfirstname,
      BetreuerTelefon: "+49 (0)89 289 17182",
      BetreuerEMail: "tutorbetrieb@in.tum.de",
      Postkuerzel: "SB-T-IN",
      "Name 2": req.body.lastname + ", " + req.body.firstname,
      Optionsfeld1: optionsfeld1,
      Staatsangehoerigkeit: staatsangehörigkeit,
      Geburtsort: req.body.birthplace,
      Geburtsland: req.body.countryofbirth,
      Geburtsdatum: moment.utc(req.body.birthday).format("DD.MM.YYYY"),
      Optionsfeld3: stipendiumdate,
      Taetigkeit: "Tutor für " + req.body.module + ": " + req.body.courseabb,
      "Zeitraum 2": zeitraum,
      "StdWoche 2": hourstogether,
      "gewuenschter Status2": gewuenschterstatus2,
      Fonds: req.body.fondsnumber,
      Kostenstelle_3: req.body.costcentre,
      "aus Studienbeitragsmassnahme": req.body.scheme,
      ausweis: ausweis,
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
      anbei14: anbeiAbschlusszeugnis,
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
      liegtvor14: liegtvorAbschlusszeugnis,
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

// @route   POST /api/forms/cfaexcel/:id
// @desc    POST to download excel sheet of contracts for veranstaltung
// @access  Private
router.post(
  "/cfaexcel/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Contract.find({
      course: req.params.id,
    })
      .populate("user", ["email"])
      .populate({ path: "profile" })
      .then((contracts) => {
        contracts.sort(function (a, b) {
          if (a.profile.lastname < b.profile.lastname) {
            return -1;
          }
          if (a.profile.lastname > b.profile.lastname) {
            return 1;
          }
          return 0;
        });

        var data = [];
        contracts.forEach((e) => {
          data.push(flatten(e.toJSON()));
        });

        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet("Customers"); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [
          { header: "Lastname", key: ["profile.lastname"], width: 25 },
          { header: "Firstname", key: ["profile.firstname"], width: 25 },
          { header: "E-Mail", key: ["user.email"], width: 25 },
          { header: "Contractstart", key: "contractstart", width: 15 },
          { header: "Contractend", key: "contractend", width: 15 },
          { header: "Weekly Hours", key: "hours", width: 15 },
          { header: "Contractstart 2", key: "contractstart2", width: 15 },
          { header: "Contractend 2", key: "contractend2", width: 15 },
          { header: "Weekly Hours 2", key: "hours2", width: 15 },
        ];

        // Add Array Rows
        worksheet.addRows(data);

        // Write to File
        workbook.xlsx
          .writeBuffer()
          .then((buf) => {
            res.type("application/pdf");
            res.send(buf);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
);

// @route   POST /api/forms/cfacsv/:id
// @desc    POST to download csv of contracts for Veranstaltung
// @access  Private
router.post(
  "/cfacsv/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Contract.find({
      course: req.params.id,
    })
      .populate("user", ["email"])
      .populate({ path: "profile" })
      .then((contracts) => {
        //Sanitise Data
        contracts.sort(function (a, b) {
          if (a.profile.lastname < b.profile.lastname) {
            return -1;
          }
          if (a.profile.lastname > b.profile.lastname) {
            return 1;
          }
          return 0;
        });

        var data = [];
        contracts.forEach((e) => {
          data.push(flatten(e.toJSON()));
        });
        const csvStringifier = createCsvStringifier({
          header: [
            { id: ["profile.lastname"], title: "Lastname" },
            { id: ["profile.firstname"], title: "Firstname" },
            { id: ["user.email"], title: ["user.email"] },
            { id: "contractstart", title: "Contractstart" },
            { id: "contractend", title: "Contractend" },
            { id: "hours", title: "Weekly Hours" },
            { id: "contractstart2", title: "Contractstart 2" },
            { id: "contractend2", title: "Contractend 2" },
            { id: "hours2", title: "Weekly Hours 2" },
          ],
        });
        res.send(csvStringifier.stringifyRecords(data));
      });
  }
);

// @route   POST /api/forms/cfaadminexcel/:id
// @desc    POST to download excel sheet of contracts for veranstaltung
// @access  Private
router.post(
  "/cfaadminexcel/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Contract.find({
      course: req.params.id,
    })
      .populate("user", ["email"])
      .populate({ path: "profile" })
      .then((contracts) => {
        contracts.sort(function (a, b) {
          if (a.profile.lastname < b.profile.lastname) {
            return -1;
          }
          if (a.profile.lastname > b.profile.lastname) {
            return 1;
          }
          return 0;
        });

        var data = [];
        contracts.forEach((e) => {
          data.push(flatten(e.toJSON()));
        });

        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet("Customers"); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [
          { header: "Lastname", key: ["profile.lastname"], width: 25 },
          { header: "Firstname", key: ["profile.firstname"], width: 25 },
          { header: "E-Mail", key: ["user.email"], width: 25 },
          { header: "Status", key: ["status"], width: 25 },
          { header: "Contractstart", key: "contractstart", width: 15 },
          { header: "Contractend", key: "contractend", width: 15 },
          { header: "Weekly Hours", key: "hours", width: 15 },
          { header: "Contractstart 2", key: "contractstart2", width: 15 },
          { header: "Contractend 2", key: "contractend2", width: 15 },
          { header: "Weekly Hours 2", key: "hours2", width: 15 },
        ];

        // Add Array Rows
        worksheet.addRows(data);

        // Write to File
        workbook.xlsx;
        workbook.xlsx
          .writeBuffer()
          .then((buf) => {
            res.type("application/pdf");
            res.send(buf);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
);

// @route   POST /api/forms/scdexcel
// @desc    POST to download excel sheet of contracts for semester
// @access  Private
router.post(
  "/scdexcel",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.find({
      semester: req.body[0].value,
    }).then((courses) => {
      var courseIDs = [];
      courses.forEach((e) => {
        courseIDs.push(e._id);
      });
      Contract.find({
        course: { $in: courseIDs },
      })
        .populate("user", ["email"])
        .populate({ path: "profile" })
        .populate({
          path: "course",
          select: { metacourse: 1 },
          populate: {
            path: "metacourse",
            select: { name: 1, abbreviation: 2, module: 3 },
          },
        })
        .then((contracts) => {
          contracts.sort(function (a, b) {
            if (a.profile.lastname < b.profile.lastname) {
              return -1;
            }
            if (a.profile.lastname > b.profile.lastname) {
              return 1;
            }
            return 0;
          });

          var data = [];
          contracts.forEach((e) => {
            data.push(flatten(e.toJSON()));
          });
          let workbook = new excel.Workbook(); //creating workbook
          let worksheet = workbook.addWorksheet("Customers"); //creating worksheet

          //  WorkSheet Header
          worksheet.columns = [
            { header: "Nachname", key: ["profile.lastname"], width: 25 },
            { header: "Vorname", key: ["profile.firstname"], width: 25 },
            { header: "E-Mail", key: ["user.email"], width: 25 },
            {
              header: "Veranstaltung",
              key: ["course.metacourse.name"],
              width: 40,
            },
            { header: "Status", key: ["status"], width: 25 },
            { header: "Vertragstart", key: "contractstart", width: 20 },
            { header: "Vertragende", key: "contractend", width: 20 },
            { header: "Wochenstunden", key: "hours", width: 20 },
            { header: "Vertragstart 2", key: "contractstart2", width: 20 },
            { header: "Vertragende 2", key: "contractend2", width: 20 },
            { header: "Wochenstunden 2", key: "hours2", width: 20 },
          ];

          // Add Array Rows
          worksheet.addRows(data);

          // Write to File
          workbook.xlsx;
          workbook.xlsx
            .writeBuffer()
            .then((buf) => {
              res.type("application/pdf");
              res.send(buf);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          res.status(404).json(err);
        });
    });
  }
);

// @route   POST /api/forms/dsgvocsv/:id
// @desc    POST to download csv for dsgvo
// @access  Private
router.post(
  "/dsgvocsv/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      _id: req.params.id,
    })
      .populate("user")
      .then((profile) => {
        var data = [];
        data.push(flatten(profile.toJSON()));
        console.log(data);
        const csvStringifier = createCsvStringifier({
          header: [
            { id: "lastname", title: "lastname" },
            { id: "firstname", title: "Firstname" },
            { id: ["user.email"], title: ["user.email"] },
            { id: ["user.active"], title: ["user.active"] },
            { id: ["user.date"], title: ["user.date"] },
            { id: ["user.lastlogin"], title: ["user.lastlogin"] },
            { id: ["user.creationdate"], title: ["user.creationdate"] },
            { id: "gender", title: "Gender" },
            { id: "matrikelnummer", title: "Matrikelnummer" },
            { id: "birthday", title: "Birthday" },
            { id: "nationality", title: "Nationality" },
            { id: "nationality2", title: "Nationality2" },
            { id: "experience", title: "Experience" },
            { id: "education", title: "Education" },
            { id: "date", title: "Date" },
            { id: "aufenthaltend", title: "Aufenthaltend" },
            { id: "birthplace", title: "Birthplace" },
            { id: "countryofbirth", title: "Country of Birth" },
            { id: "currentfieldofstudy", title: "Currentfieldofstudy" },
            { id: "degree", title: "Degree" },
            { id: "stipendiumend", title: "Stipendium" },
          ],
        });
        res.send(csvStringifier.stringifyRecords(data));
      });
  }
);

module.exports = router;
