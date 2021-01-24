const express = require("express");
const router = express.Router();
const passport = require("passport");

const nodemailer = require("nodemailer");
const sendmail = require("sendmail")();

// @route   GET /api/message/test
// @desc    Test semester route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Message Works" }));

// @route   POST api/message/testmail
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

const nodemailerTestApiCall = new Promise(async function (resolve, reject) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "tutorbetrieb@in.tum.de", // sender address
    to: "philipp.spanner@googlemail.com", // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...});
});

module.exports = router;
