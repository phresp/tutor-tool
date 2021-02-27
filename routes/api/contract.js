const isEmpty = require("../../validation/is-empty");

const express = require("express");
const router = express.Router();
const passport = require("passport");

const validateContractInput = require("../../validation/contract");

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
        select: { metacourse: 1 },
        populate: {
          path: "metacourse",
          select: { name: 1, abbreviation: 2, module: 3 },
        },
      })
      .populate({
        path: "course",
        select: { semester: 1 },
        populate: {
          path: "semester",
        },
      })
      .populate({ path: "application" })
      .populate("user", ["email"])
      .populate({ path: "profile" })
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

// @route   GET /api/contract/contract/userid/:id
// @desc    GET contracts of user
// @access  Private
router.get(
  "/contract/userid/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Contract.find({ user: req.params.id })
      .populate({
        path: "course",
        select: { metacourse: 1 },
        populate: {
          path: "metacourse",
          select: { name: 1, abbreviation: 2, module: 3 },
        },
      })
      .populate({
        path: "course",
        select: { semester: 1 },
        populate: {
          path: "semester",
        },
      })
      .populate({ path: "application" })
      .populate({ path: "profile" })
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
        select: { metacourse: 1 },
        populate: {
          path: "metacourse",
          select: { name: 1, abbreviation: 2, module: 3 },
        },
      })
      .populate({
        path: "course",
        select: { semester: 1 },
        populate: {
          path: "semester",
        },
      })
      .populate({ path: "application" })
      .populate("user", ["email"])
      .populate({ path: "profile" })
      .then((contracts) => {
        if (!contracts) {
          errors.application = "There are no contracts";
          return res.status(404).json(errors);
        }
        res.json(contracts);
      })
      .catch((err) =>
        res.status(404).json({ application: "There are no contracts" })
      );
  }
);

// @route   GET api/contract/contract/:id
// @desc    Get contract by ID
// @access  Private
router.get(
  "/contract/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Contract.findOne({ _id: req.params.id })
      .populate({
        path: "course",
        select: { metacourse: 1 },
        populate: {
          path: "metacourse",
        },
      })
      .populate({
        path: "course",
        populate: {
          path: "semester",
        },
      })
      .populate({ path: "application" })
      .populate({ path: "profile" })
      .populate("user", ["email"])
      .then((contract) => {
        if (!contract) {
          errors.application = "There is no contract";
          return res.status(404).json(errors);
        }
        res.json(contract);
      })
      .catch((err) => {
        res.status(404).json({ contract: "There is no contract with this ID" });
      });
  }
);

// @route   GET api/contract/application/:id
// @desc    Get contracts for user of applicationID
// @access  Private
router.get(
  "/application/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Application.findOne({ _id: req.params.id })
      .then((application) => {
        if (!application) {
          errors.noapplication = "There is no application for the course yet";
          return res.status(404).json(errors);
        }
        Contract.find({ user: application.user })
          .then((contracts) => {
            if (!application) {
              errors.nocontracts =
                "There are no other contracts for the user yet";
              return res.status(404).json(errors);
            }
            res.json(contracts);
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET /api/contract/course/:id
// @desc    Get contracts for user of applicationID
// @access  Private
router.get(
  "/course/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Contract.find({ course: req.params.id })
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

// @route   GET api/contract/contractofid/:id
// @desc    Get contracts for user of applicationID
// @access  Private
router.get(
  "/contractofid/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Contract.findOne({ _id: req.params.id })
      .then((contract) => {
        if (!contract) {
          errors.nocontract = "There is no contract for the course yet";
          return res.status(404).json(errors);
        }
        Contract.find({ user: contract.user })
          .then((contracts) => {
            if (!contracts) {
              errors.nocontracts =
                "There are no other contracts for the user yet";
              return res.status(404).json(errors);
            }
            const removeIndex = contracts
              .map((item) => item.id)
              .indexOf(req.params.id);

            //Splice out of array
            contracts.splice(removeIndex, 1);

            res.json(contracts);
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   POST /api/contract
// @desc    POST to create contract
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate Input fields
    const { errors, isValid } = validateContractInput(req.body);
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    //Get Body Fields
    const contractFields = {};
    contractFields.user = req.body.user;
    contractFields.profile = req.body.profile;
    contractFields.course = req.body.course;
    contractFields.application = req.body.applicationID;
    contractFields.contractstart = req.body.contractstart;
    contractFields.contractend = req.body.contractend;
    contractFields.hours = req.body.hours;
    contractFields.contractstart2 = req.body.contractstart2;
    contractFields.contractend2 = req.body.contractend2;
    contractFields.hours2 = req.body.hours2;
    contractFields.degree = req.body.degree;
    contractFields.newcontract = req.body.newcontract;
    contractFields.merkblatt = req.body.merkblatt
      ? req.body.merkblatt
      : "Fehlt";
    contractFields.einstellungsvorschlag = req.body.einstellungsvorschlag
      ? req.body.einstellungsvorschlag
      : "Fehlt";
    contractFields.versicherungspflicht = req.body.versicherungspflicht
      ? req.body.versicherungspflicht
      : "Fehlt";
    contractFields.scientology = req.body.scientology
      ? req.body.scientology
      : "Fehlt";
    contractFields.verfassungstreue = req.body.verfassungstreue
      ? req.body.verfassungstreue
      : "Fehlt";
    contractFields.immatrikulationsbescheinigung0 = req.body
      .immatrikulationsbescheinigung0
      ? req.body.immatrikulationsbescheinigung0
      : "";
    contractFields.immatrikulationsbescheinigung = req.body
      .immatrikulationsbescheinigung
      ? req.body.immatrikulationsbescheinigung
      : "Fehlt";
    contractFields.immatrikulationsbescheinigung2 = req.body
      .immatrikulationsbescheinigung2
      ? req.body.immatrikulationsbescheinigung2
      : "";
    contractFields.aufenthaltstitel = req.body.aufenthaltstitel
      ? req.body.aufenthaltstitel
      : "Fehlt";
    contractFields.krankenkassenbescheinigung = req.body
      .krankenkassenbescheinigung
      ? req.body.krankenkassenbescheinigung
      : "Fehlt";
    contractFields.personalbogenbezuegestelle = req.body
      .personalbogenbezuegestelle
      ? req.body.personalbogenbezuegestelle
      : "Fehlt";
    contractFields.personalbogenstudierende = req.body.personalbogenstudierende
      ? req.body.personalbogenstudierende
      : "Fehlt";
    contractFields.steuerId = req.body.steuerId ? req.body.steuerId : "Fehlt";
    contractFields.reisepass = req.body.reisepass
      ? req.body.reisepass
      : "Fehlt";
    contractFields.stipendium = req.body.stipendium
      ? req.body.stipendium
      : "Fehlt";
    contractFields.abschlusszeugnis = req.body.abschlusszeugnis
      ? req.body.abschlusszeugnis
      : "Fehlt";

    contractFields.contractcomment = req.body.contractcomment
      ? req.body.contractcomment
      : "";

    contractFields.lastchangeddate = Date.now();
    contractFields.lasthandle = req.body.lasthandle;
    contractFields.status = req.body.status ? req.body.status : "created";

    //Create Contract
    new Contract(contractFields).save().then((contract) => {
      //Update Application
      Application.findOneAndUpdate(
        { _id: req.body.applicationID },
        { $set: { status: "Contract" } },
        { new: true }
      )
        .then((contract) => res.json(contract))
        .catch((err) =>
          res.status(400).json({ contractnotfound: "Contract not found" })
        );
    });
  }
);

// @route   POST /api/contract/separatecontract
// @desc    POST to create contract
// @access  Private
router.post(
  "/separatecontract",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate Input fields
    const { errors, isValid } = validateContractInput(req.body);
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    //Get Body Fields
    const contractFields = {};
    contractFields.user = req.body.user;
    contractFields.profile = req.body.profile;
    contractFields.course = req.body.course;

    contractFields.merkblatt = "Fehlt";
    contractFields.einstellungsvorschlag = "Fehlt";
    contractFields.versicherungspflicht = "Fehlt";
    contractFields.scientology = "Fehlt";
    contractFields.verfassungstreue = "Fehlt";
    contractFields.immatrikulationsbescheinigung = "Fehlt";
    contractFields.aufenthaltstitel = "Fehlt";
    contractFields.krankenkassenbescheinigung = "Fehlt";
    contractFields.personalbogenbezuegestelle = "Fehlt";
    contractFields.personalbogenstudierende = "Fehlt";
    contractFields.steuerId = "Fehlt";
    contractFields.reisepass = "Fehlt";
    contractFields.stipendium = "Fehlt";
    contractFields.status = "Fehlt";
    contractFields.abschlusszeugnis = "Fehlt";
    contractFields.contractcomment = "";

    contractFields.status = req.body.status ? req.body.status : "created";

    contractFields.lastchangeddate = Date.now();
    contractFields.lasthandle = req.body.lasthandle;

    //Create Contract
    new Contract(contractFields)
      .save()
      .then((contract) => res.json(contract._id))
      .catch((err) =>
        res.status(400).json({ contractnotfound: "Contract not found" })
      );
  }
);

// @route   POST /api/contract/update/:id
// @desc    POST to update contract
// @access  Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate Input fields
    const { errors, isValid } = validateContractInput(req.body);
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    //Get Body Fields
    const contractFields = {};
    contractFields.user = req.body.user;
    contractFields.profile = req.body.profile;
    contractFields.course = req.body.course;
    contractFields.application = req.body.applicationID;
    contractFields.contractstart = req.body.contractstart;
    contractFields.contractend = req.body.contractend;
    contractFields.hours = req.body.hours;
    contractFields.contractstart2 = req.body.contractstart2;
    contractFields.contractend2 = req.body.contractend2;
    contractFields.hours2 = req.body.hours2;
    contractFields.degree = req.body.degree;
    contractFields.newcontract = req.body.newcontract;
    contractFields.merkblatt = req.body.merkblatt;
    contractFields.einstellungsvorschlag = req.body.einstellungsvorschlag;
    contractFields.versicherungspflicht = req.body.versicherungspflicht;
    contractFields.scientology = req.body.scientology;
    contractFields.verfassungstreue = req.body.verfassungstreue;
    contractFields.immatrikulationsbescheinigung0 =
      req.body.immatrikulationsbescheinigung0;
    contractFields.immatrikulationsbescheinigung =
      req.body.immatrikulationsbescheinigung;
    contractFields.immatrikulationsbescheinigung2 =
      req.body.immatrikulationsbescheinigung2;

    contractFields.aufenthaltstitel = req.body.aufenthaltstitel;
    contractFields.krankenkassenbescheinigung =
      req.body.krankenkassenbescheinigung;
    contractFields.personalbogenbezuegestelle =
      req.body.personalbogenbezuegestelle;
    contractFields.personalbogenstudierende = req.body.personalbogenstudierende;
    contractFields.steuerId = req.body.steuerId;
    contractFields.reisepass = req.body.reisepass;
    contractFields.stipendium = req.body.stipendium;
    contractFields.status = req.body.status;
    contractFields.abschlusszeugnis = req.body.abschlusszeugnis;
    contractFields.contractcomment = req.body.contractcomment;

    contractFields.lastchangeddate = Date.now();
    contractFields.lasthandle = req.body.lasthandle;

    //Update Contract
    Contract.findOneAndUpdate(
      { _id: req.params.id },
      { $set: contractFields },
      { new: true }
    )
      .then((contract) => res.send(contract))
      .catch((err) => res.status(404).json(err));
  }
);

// @route   DELETE api/contract/deletecontract/:id
// @desc    Delete contract
// @access  Private
router.delete(
  "/deletecontract/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Contract.findOne({
      _id: req.params.id,
    })
      .then((contract) => {
        if (contract.application) {
          var applicationFields = {};
          applicationFields.status = "Contract revoked";
          //Update Application
          Application.findOneAndUpdate(
            { _id: contract.application },
            { $set: applicationFields },
            { new: true }
          )
            .then(() => {
              Contract.findOneAndDelete({
                _id: req.params.id,
              })
                .then(res.json("success"))
                .catch((err) => res.json(err));
            })
            .catch((err) => res.status(404).json(err));
        } else {
          Contract.findOneAndDelete({
            _id: req.params.id,
          })
            .then(res.json("success"))
            .catch((err) => res.json(err));
        }
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
);

module.exports = router;
