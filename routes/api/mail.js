const express = require("express");
const router = express.Router();
const passport = require("passport");

const nodemailer = require("nodemailer");
const sendmail = require("sendmail")();

//Load User model
const MailTemplate = require("../../models/MailTemplate");

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
  (req, res) => {
    sendmail(
      {
        from: "tutorbetrieb@in.tum.de",
        to: "philipp.spanner@googlemail.com",
        subject: "test sendmail",
        html: "Mail of test sendmail",
      },
      function (err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
      }
    );
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
      .then((tamplate) => res.send(tamplate))
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

// const nodemailerTestApiCall = new Promise(async function (resolve, reject) {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();
//
//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });
//
//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: "tutorbetrieb@in.tum.de", // sender address
//     to: "philipp.spanner@googlemail.com", // list of receivers
//     subject: "Hello", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });
//
//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//
//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...});
// });

module.exports = router;
