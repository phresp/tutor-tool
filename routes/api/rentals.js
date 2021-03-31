const express = require("express");
const router = express.Router();
const passport = require("passport");
const pdftk = require("node-pdftk");
const path = require("path");
const moment = require("moment");

//Leihschein-Template-Path
const pdfTemplatePath = path.resolve(
  __dirname + "../../../templates/Leihschein-Template.pdf"
);

//PDF Outout Path Keep for debugging purposes
// const pdfOutputPath = path.resolve(
//   __dirname + "../../../templates/Leihschein-Template-filled.pdf"
// );

//Load input validation
const validateRentalsInput = require("../../validation/rentals");

//Load Rentals model
const Rentals = require("../../models/Rentals");

//Load Rentals model
const RentalsApplications = require("../../models/RentalsApplications");

// @route   GET /api/users/test
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Rentals Works" }));

// @route   GET /api/rentals
// @desc    Get all Rentals
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Rentals.find()
      .sort({ date: -1 })
      .then((rentals) => res.json(rentals))
      .catch((err) =>
        res.status(404).json({ norentalfound: "Keine Ausleihen gefunden" })
      );
  }
);

// @route   GET /api/rentals/:id
// @desc    Get Rental by id
// @access  Private
router.get("/:id", (req, res) => {
  const errors = {};
  Rentals.findOne({ _id: req.params.id })
    .then((rental) => {
      res.json(rental);
    })
    .catch((err) =>
      res.status(404).json({ rentalnotfound: "Keine Ausleihen gefunden" })
    );
});

// @route   Post /api/rentals
// @desc    Post new Rental
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRentalsInput(req.body);
    //Check validation
    if (!isValid) {
      //If not valid, send 400 with errors
      res.status(400).json(errors);
    }

    //Get fields
    const rentalsFields = {};
    rentalsFields.name = req.body.name;
    rentalsFields.vorname = req.body.vorname;
    if (req.body.tumid) rentalsFields.tumid = req.body.tumid;
    if (req.body.email) rentalsFields.email = req.body.email;
    //Anschrift
    rentalsFields.adresse = {};
    if (req.body.strasse) rentalsFields.adresse.strasse = req.body.strasse;
    if (req.body.ort) rentalsFields.adresse.ort = req.body.ort;
    if (req.body.plz) rentalsFields.adresse.plz = req.body.plz;

    if (req.body.telefonnummer)
      rentalsFields.telefonnummer = req.body.telefonnummer;
    if (req.body.veranstaltung)
      rentalsFields.veranstaltung = req.body.veranstaltung;

    //Vertragslaufzeit
    rentalsFields.vertragslaufzeit = {};
    if (req.body.von) rentalsFields.vertragslaufzeit.von = req.body.von;
    if (req.body.bis) rentalsFields.vertragslaufzeit.bis = req.body.bis;

    if (req.body.betreuer) rentalsFields.betreuer = req.body.betreuer;
    if (req.body.angeschrieben)
      rentalsFields.angeschrieben = req.body.angeschrieben;
    if (req.body.rückmeldung) rentalsFields.rückmeldung = req.body.rückmeldung;
    if (req.body.leihscheinverschickt)
      rentalsFields.leihscheinverschickt = req.body.leihscheinverschickt;
    if (req.body.rückgabe) rentalsFields.rückgabe = req.body.rückgabe;
    if (req.body.details) rentalsFields.details = req.body.details;
    if (req.body.status) rentalsFields.status = req.body.status;
    if (req.body.handle) rentalsFields.lasthandle = req.body.handle;

    //Leihobjekt
    rentalsFields.leihobjekt = {};
    if (req.body.ipad) rentalsFields.leihobjekt.ipad = req.body.ipad;
    if (req.body.mikrofon)
      rentalsFields.leihobjekt.mikrofon = req.body.mikrofon;
    if (req.body.wacom) rentalsFields.leihobjekt.wacom = req.body.wacom;
    if (req.body.webcam) rentalsFields.leihobjekt.webcam = req.body.webcam;
    if (req.body.stativ) rentalsFields.leihobjekt.stativ = req.body.stativ;

    new Rentals(rentalsFields).save().then((rentals) => res.json(rentals));
  }
);

// @route   POST api/rentals/:id
// @desc    Edit Rental
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRentalsInput(req.body);
    //Check validation
    if (!isValid) {
      //If not valid, send 400 with errors
      res.status(400).json(errors);
    }
    //Get fields
    const rentalsFields = {};
    rentalsFields.name = req.body.name;
    rentalsFields.vorname = req.body.vorname;
    if (req.body.tumid) rentalsFields.tumid = req.body.tumid;
    if (req.body.email) rentalsFields.email = req.body.email;

    //Anschrift
    rentalsFields.adresse = {};
    if (req.body.strasse) rentalsFields.adresse.strasse = req.body.strasse;
    if (req.body.ort) rentalsFields.adresse.ort = req.body.ort;
    if (req.body.plz) rentalsFields.adresse.plz = req.body.plz;

    if (req.body.telefonnummer)
      rentalsFields.telefonnummer = req.body.telefonnummer;
    if (req.body.veranstaltung)
      rentalsFields.veranstaltung = req.body.veranstaltung;

    //Vertragslaufzeit
    rentalsFields.vertragslaufzeit = {};
    if (req.body.von) rentalsFields.vertragslaufzeit.von = req.body.von;
    if (req.body.bis) rentalsFields.vertragslaufzeit.bis = req.body.bis;

    if (req.body.betreuer) rentalsFields.betreuer = req.body.betreuer;
    if (req.body.angeschrieben)
      rentalsFields.angeschrieben = req.body.angeschrieben;
    if (req.body.rückmeldung) rentalsFields.rückmeldung = req.body.rückmeldung;
    if (req.body.leihscheinverschickt)
      rentalsFields.leihscheinverschickt = req.body.leihscheinverschickt;
    if (req.body.rückgabe) rentalsFields.rückgabe = req.body.rückgabe;
    if (req.body.details) rentalsFields.details = req.body.details;
    if (req.body.status) rentalsFields.status = req.body.status;
    if (req.body.handle) rentalsFields.lasthandle = req.body.handle;

    //Leihobjekt
    rentalsFields.leihobjekt = {};
    if (req.body.ipad) rentalsFields.leihobjekt.ipad = req.body.ipad;
    if (req.body.mikrofon)
      rentalsFields.leihobjekt.mikrofon = req.body.mikrofon;
    if (req.body.wacom) rentalsFields.leihobjekt.wacom = req.body.wacom;
    if (req.body.webcam) rentalsFields.leihobjekt.webcam = req.body.webcam;
    if (req.body.stativ) rentalsFields.leihobjekt.stativ = req.body.stativ;
    rentalsFields.date = Date.now();

    //Update
    Rentals.findOneAndUpdate(
      { _id: req.params.id },
      { $set: rentalsFields },
      { new: true }
    )
      .then((rentals) => res.json(rentals))
      .catch((err) =>
        res.status(404).json({ norentalfound: "Keine Ausleihen gefunden" })
      );
  }
);

// @route   DELETE /api/rentals/:id
// @desc    DELETE Rental
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Rentals.findById(req.params.id)
      .then((rental) => {
        // Delete
        rental.remove().then(() => res.status(200).json({ success: true }));
      })
      .catch((err) => {
        res.status(404).json({ rentalnotfound: "Ausleihe nicht gefunden" });
      });
  }
);

// @route   GET /api/rentals/download/rentalform
// @desc    GET Filled pdf
// @access  Private
router.post(
  "/download/rentalform",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const formdata = {
      name: req.body.name + ", " + req.body.vorname,
      tumid: req.body.tumid,
      adresse1: req.body.strasse,
      adresse2: req.body.plz + " " + req.body.ort,
      telefonnummer: req.body.telefonnummer,
      rückgabe: moment.utc(req.body.rückgabe).format("DD-MM-YYYY"),
      devicerow1: "",
      devicerow2: "",
      devicerow3: "",
      devicerow4: "",
      devicerow5: "",
    };
    var counter = 1;
    //formdata["devicerow" + counter] = "test";

    if (req.body.ipad) {
      formdata["devicerow" + counter] =
        "Apple iPad Pro 12,9“ (4th gen) + Smart Folio + Apple Pencil (2nd Gen)  ";
      counter++;
    }
    if (req.body.mikrofon) {
      formdata["devicerow" + counter] = "Mikrofon Rhode NT-USB";
      counter++;
    }
    if (req.body.wacom) {
      formdata["devicerow" + counter] = "Wacom one Medium 2017";
      counter++;
    }
    if (req.body.webcam) {
      formdata["devicerow" + counter] = "Webcam Logitech C925e";
      counter++;
    }
    if (req.body.stativ) {
      formdata["devicerow" + counter] = "Mikrofonstativ K&M 25400";
      counter++;
    }
    pdftk
      .input(pdfTemplatePath)
      .fillForm(formdata)
      .flatten()
      .output()
      .then((buf) => {
        res.type("application/pdf");
        res.send(buf);
      })
      .catch((err) => {
        res.status(404).json("something wrong here" + { err });
      });
  }
);

// @route   GET /api/rentals/applications/all
// @desc    Get all Rentalsapplications
// @access  Private
router.get(
  "/applications/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    RentalsApplications.find()
      .populate("profile")
      .sort({ date: -1 })
      .then((rentalsapplications) => res.json(rentalsapplications))
      .catch((err) =>
        res.status(404).json({ norentalfound: "Keine Anfrage gefunden" })
      );
  }
);

// @route   GET /api/rentals/application/:id
// @desc    Get Rental by id
// @access  Private
router.get("/application/:id", (req, res) => {
  const errors = {};
  RentalsApplications.findOne({ _id: req.params.id })
    .populate("profile")
    .then((rentalapplication) => {
      res.json(rentalapplication);
    })
    .catch((err) =>
      res.status(404).json({ rentalnotfound: "Keine Anfrage gefunden" })
    );
});

// @route   Post /api/rentals/application/new
// @desc    Post new Rentalsapplication
// @access  Private
router.post(
  "/application/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get fields
    const rentalsApplicationFields = {};
    rentalsApplicationFields.profile = req.body.profile;
    rentalsApplicationFields.email = req.body.email;
    rentalsApplicationFields.tumid = req.body.tumid;

    //Anschrift
    rentalsApplicationFields.adresse = {};
    if (req.body.strasse)
      rentalsApplicationFields.adresse.strasse = req.body.strasse;
    if (req.body.ort) rentalsApplicationFields.adresse.ort = req.body.ort;
    if (req.body.plz) rentalsApplicationFields.adresse.plz = req.body.plz;

    if (req.body.telefonnummer)
      rentalsApplicationFields.telefonnummer = req.body.telefonnummer;

    //Leihobjekt
    rentalsApplicationFields.leihobjekt = {};
    if (req.body.ipad) rentalsApplicationFields.leihobjekt.ipad = req.body.ipad;
    if (req.body.mikrofon)
      rentalsApplicationFields.leihobjekt.mikrofon = req.body.mikrofon;
    if (req.body.wacom)
      rentalsApplicationFields.leihobjekt.wacom = req.body.wacom;
    if (req.body.webcam)
      rentalsApplicationFields.leihobjekt.webcam = req.body.webcam;
    if (req.body.stativ)
      rentalsApplicationFields.leihobjekt.stativ = req.body.stativ;

    new RentalsApplications(rentalsApplicationFields)
      .save()
      .then((rentalsApplication) => res.json(rentalsApplication));
  }
);

// @route   POST api/rentals/application/:id
// @desc    Edit Rental
// @access  Private
router.post(
  "/application/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get fields
    const rentalsApplicationFields = {};

    //Leihobjekt
    rentalsApplicationFields.leihobjekt = {};
    if (req.body.ipad) rentalsApplicationFields.leihobjekt.ipad = req.body.ipad;
    if (req.body.mikrofon)
      rentalsApplicationFields.leihobjekt.mikrofon = req.body.mikrofon;
    if (req.body.wacom)
      rentalsApplicationFields.leihobjekt.wacom = req.body.wacom;
    if (req.body.webcam)
      rentalsApplicationFields.leihobjekt.webcam = req.body.webcam;
    if (req.body.stativ)
      rentalsApplicationFields.leihobjekt.stativ = req.body.stativ;

    //Anschrift
    rentalsApplicationFields.adresse = {};
    if (req.body.strasse)
      rentalsApplicationFields.adresse.strasse = req.body.strasse;
    if (req.body.ort) rentalsApplicationFields.adresse.ort = req.body.ort;
    if (req.body.plz) rentalsApplicationFields.adresse.plz = req.body.plz;

    if (req.body.telefonnummer)
      rentalsApplicationFields.telefonnummer = req.body.telefonnummer;

    //Status
    if (req.body.status) rentalsApplicationFields.status = req.body.status;

    //Update
    RentalsApplications.findOneAndUpdate(
      { _id: req.params.id },
      { $set: rentalsApplicationFields },
      { new: true }
    )
      .then((rentals) => res.json(rentals))
      .catch((err) =>
        res.status(404).json({ norentalfound: "Keine Ausleihen gefunden" })
      );
  }
);

module.exports = router;
