const express = require("express");
const router = express.Router();
const passport = require("passport");

const nodemailer = require("nodemailer");
const mailsecret = require("../../config/keys").mailsecret;
const mailuser = require("../../config/keys").mailuser;

//Load Mail model
const MailTemplate = require("../../models/MailTemplate");

//Load Profile model
const Profile = require("../../models/Profile");

//Load User model
const User = require("../../models/User");

//Load Course model
const Course = require("../../models/Course");

//Load Course model
const Contracts = require("../../models/Contract");

//Load Validation
const validateMailInput = require("../../validation/mail");

// @route   GET /api/mail/test
// @desc    Test semester route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Mail Works" }));

// @route   GET api/mail/templates/all
// @desc    Get all Templates
// @access  Private
router.get(
  "/templates/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Check authorization
    const errors = {};
    // if (!(req.user.role === "Admin" || "Supervisor")) {
    //   errors.profile = "Unzureichende Berechtigung";
    //   res.status(401).json(errors.profile);
    // }

    MailTemplate.find()
      .then((templates) => {
        if (!templates) {
          errors.tempplate = "There are no templates";
          return res.status(404).json(errors);
        }
        res.json(templates);
      })
      .catch((err) =>
        res.status(404).json({ profile: "There are no templates" })
      );
  }
);

// @route   GET api/mail/template/:id
// @desc    Get Template by ID
// @access  Private
router.get(
  "/template/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Check authorization
    const errors = {};
    // if (!(req.user.role === "Admin" || "Supervisor")) {
    //   errors.profile = "Unzureichende Berechtigung";
    //   res.status(401).json(errors.profile);
    // }
    MailTemplate.findOne({ _id: req.params.id })
      .then((template) => {
        if (!template) {
          errors.tempplate = "There is no template";
          return res.status(404).json(errors);
        }
        res.json(template);
      })
      .catch((err) =>
        res.status(404).json({ profile: "There is no template" })
      );
  }
);

// @route   POST api/mail/testmail
// @desc    send Testmail
// @access  Private
router.post(
  "/testmail",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const transporter = nodemailer.createTransport({
      host: "mail.in.tum.de",
      port: 465,
      auth: {
        user: mailuser,
        pass: mailsecret,
      },
    });

    const mailFields = {};
    mailFields.from = "spanner@in.tum.de";
    mailFields.to = "philipp.spanner@googlemail.com";
    mailFields.subject = "Object Test";
    mailFields.text = "YoHiVo";
    console.log(mailFields);
    // send email
    await transporter.sendMail(mailFields);

    return res.status(200).json("success");
  }
);

// @route   POST api/mail/sendmail
// @desc    send Mail
// @access  Private
router.post(
  "/sendmail",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMailInput(req.body);
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(500).json(errors);
    }
    if (req.body.to === "Alle Tutoren") {
      Profile.find({ receivemails: true })
        .populate("user", ["email", "role"])
        .then((profiles) => {
          var students = profiles.filter((el) => {
            return el.user.role === "Student";
          });
          //create Transporter
          const transporter = nodemailer.createTransport({
            host: "mail.in.tum.de",
            port: 465,
            auth: {
              user: mailuser,
              pass: mailsecret,
            },
          });
          students.forEach((el) => {
            //Get Body Values
            var mailFields = {};
            mailFields.from = "tutorbetrieb@in.tum.de";
            mailFields.subject = req.body.subject;
            mailFields.text = req.body.text;
            mailFields.bcc = el.user.email;
            // send email
            transporter.sendMail(mailFields);
          });

          //Get Body Values
          var mailFields = {};
          mailFields.from = "tutorbetrieb@in.tum.de";
          mailFields.subject = req.body.subject;
          mailFields.text = req.body.text;
          mailFields.to = req.user.email;
          // send email
          transporter.sendMail(mailFields);
        });

      return res.status(200).json("success");
    } else if (req.body.to === "Alle aktiven Übungsleiter") {
      Course.find({ status: { $ne: "Archive" } }).then((courses) => {
        User.aggregate([
          {
            $match: {
              role: "Advisor",
            },
          },
          {
            $lookup: {
              from: "profiles",
              localField: "_id",
              foreignField: "user",
              as: "profile",
            },
          },
        ]).then((advisors) => {
          var activeadvisors = [];

          advisors.forEach((advisorele) => {
            courses.some((courseele) => {
              if (
                advisorele._id.equals(courseele.advisor) ||
                advisorele._id.equals(courseele.advisor2) ||
                advisorele._id.equals(courseele.advisor3)
              ) {
                return activeadvisors.push(advisorele);
              }
            });
          });

          //create Transporter
          const transporter = nodemailer.createTransport({
            host: "mail.in.tum.de",
            port: 465,
            auth: {
              user: mailuser,
              pass: mailsecret,
            },
          });
          activeadvisors.forEach((el) => {
            //Get Body Values
            var mailFields = {};
            mailFields.from = "tutorbetrieb@in.tum.de";
            mailFields.subject = req.body.subject;
            mailFields.text = req.body.text;
            mailFields.bcc = el.user.email;
            // send email
            transporter.sendMail(mailFields);
          });

          //Get Body Values
          var mailFields = {};
          mailFields.from = "tutorbetrieb@in.tum.de";
          mailFields.subject = req.body.subject;
          mailFields.text = req.body.text;
          mailFields.to = req.user.email;
          // send email
          transporter.sendMail(mailFields);
        });
      });
      return res.status(200).json("success");
    } else if (req.body.to === "Alle unvollständigen Verträge") {
      Contracts.find({ status: "Incomplete" })
        .populate("user", ["email"])
        .then((contracts) => {
          //create Transporter
          const transporter = nodemailer.createTransport({
            host: "mail.in.tum.de",
            port: 465,
            auth: {
              user: mailuser,
              pass: mailsecret,
            },
          });
          contracts.forEach((el) => {
            //Get Body Values
            var mailFields = {};
            mailFields.from = "tutorbetrieb@in.tum.de";
            mailFields.subject = req.body.subject;
            mailFields.text = req.body.text;
            mailFields.bcc = el.user.email;
            // send email
            transporter.sendMail(mailFields);
          });

          //Get Body Values
          var mailFields = {};
          mailFields.from = "tutorbetrieb@in.tum.de";
          mailFields.subject = req.body.subject;
          mailFields.text = req.body.text;
          mailFields.to = req.user.email;
          // send email
          transporter.sendMail(mailFields);
        });
      return res.status(200).json("success");
    } else if (req.body.to === "Alle mit Vertrag in Semester") {
      Course.find({ semester: req.body.semester }).then((courses) => {
        var courseIDs = [];
        courses.forEach((e) => courseIDs.push(e._id));
        Contracts.find({ course: { $in: courseIDs } })
          .populate("user", ["email"])
          .then((contracts) => {
            //create Transporter
            const transporter = nodemailer.createTransport({
              host: "mail.in.tum.de",
              port: 465,
              auth: {
                user: mailuser,
                pass: mailsecret,
              },
            });
            contracts.forEach((el) => {
              //Get Body Values
              var mailFields = {};
              mailFields.from = "tutorbetrieb@in.tum.de";
              mailFields.subject = req.body.subject;
              mailFields.text = req.body.text;
              mailFields.bcc = el.user.email;
              // send email
              transporter.sendMail(mailFields);
            });

            //Get Body Values
            var mailFields = {};
            mailFields.from = "tutorbetrieb@in.tum.de";
            mailFields.subject = req.body.subject;
            mailFields.text = req.body.text;
            mailFields.to = req.user.email;
            // send email
            transporter.sendMail(mailFields);
          });
      });
      return res.status(200).json("success");
    } else {
      //create Transporter
      const transporter = nodemailer.createTransport({
        host: "mail.in.tum.de",
        port: 465,
        auth: {
          user: mailuser,
          pass: mailsecret,
        },
      });
      //Get Body Values
      const mailFields = {};
      mailFields.from = "tutorbetrieb@in.tum.de";
      mailFields.to = req.body.to;
      mailFields.subject = req.body.subject;
      mailFields.text = req.body.text;
      //mailFields.bcc = req.user.email;
      // send email
      transporter.sendMail(mailFields);

      return res.status(200).json("success");
    }
  }
);

// @route   POST api/mail/template
// @desc    create mail template
// @access  Private
router.post(
  "/template",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get Body Fields
    const templateFields = {};
    templateFields.name = req.body.name;
    templateFields.text = req.body.text;
    templateFields.subject = req.body.subject;

    //Create Template
    new MailTemplate(templateFields)
      .save()
      .then((template) => res.send(template))
      .catch((err) => res.status(400).json(err));
  }
);

// @route   POST api/mail/updatetemplate/:id
// @desc    update mail template
// @access  Private
router.post(
  "/updatetemplate/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get Body Fields
    const templateFields = {};
    templateFields.name = req.body.name;
    templateFields.text = req.body.text;
    templateFields.subject = req.body.subject;

    //Update Template
    MailTemplate.findOneAndUpdate(
      { _id: req.params.id },
      { $set: templateFields },
      { new: true }
    )
      .then((template) => res.send(template))
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
