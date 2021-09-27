const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const crypto = require("crypto");

const nodemailer = require("nodemailer");

const mailsecret = require("../../config/keys").mailsecret;
const mailuser = require("../../config/keys").mailuser;

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateChangePW = require("../../validation/changepw");

//Load User model
const User = require("../../models/User");

//Load Invitation model
const Invitaion = require("../../models/Invitation");

//Load Invitation model
const Token = require("../../models/Token");

// @route   GET /api/users/test
// @desc    Tess users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST /api/users/register
// @desc    Register a User
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email.toLowerCase() }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        password: req.body.password,
        email: req.body.email.toLowerCase(),
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              //create Transporter
              const transporter = nodemailer.createTransport({
                host: "mail.in.tum.de",
                port: 465,
                auth: {
                  user: mailuser,
                  pass: mailsecret,
                },
              });
              var mailText = `Hello,
        
thank you for your registration!
Please login to your account and create a new profile.
        
Sincerely,
The Tutorteam.`;

              //Get Body Values
              const mailFields = {};
              mailFields.from = "tutorbetrieb@in.tum.de";
              mailFields.to = req.body.email.toLowerCase();
              mailFields.subject = "New Tutortool Registration";
              mailFields.text = mailText;
              //mailFields.bcc = req.user.email;
              // send email
              transporter.sendMail(mailFields);

              res.json(user);
            })
            .catch((err) => res.json(err));
        });
      });
    }
  });
});

// @route   POST /api/users/advisorregistration/:id
// @desc    Register a User
// @access  Public
router.post("/advisorregistration/:id", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Invitation.findOne({ invitationkey: req.params.id }).then((key) => {
    var twodays = 2 * 24 * 60 * 60 * 1000; /* ms */
    if (new Date(Date.now()) - key.date < twodays) {
      User.findOne({ email: req.body.email.toLowerCase() }).then((user) => {
        if (user) {
          errors.email = "Email already exists";
          return res.status(400).json(errors);
        } else {
          const newUser = new User({
            password: req.body.password,
            email: req.body.email.toLowerCase(),
            role: "Advisor",
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  Invitation.findOneAndDelete({ invitationkey: req.params.id })
                    .then(res.json(user))
                    .catch((err) => res.json(err));
                })
                .catch((err) => res.json(err));
            });
          });
        }
      });
    } else {
      Invitation.findOneAndDelete({ invitationkey: req.params.id })
        .then(() => {
          errors.email = "Invitaionlink expired";
          res.status(400).json(errors);
        })
        .catch((err) => res.json(err));
    }
  });
});

// @route   POST /api/users/login
// @desc    Login User / Return Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then((user) => {
    if (!user || !user.active) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User Matched
        const payload = {
          id: user.id,
          role: user.role,
        };
        const userFields = {
          lastlogin: user.date,
          date: Date.now(),
        };
        User.findOneAndUpdate({ email }, { $set: userFields }, { new: true })
          .then(() => {
            // Sign Token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: "8h" },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          })
          .catch((err) => res.status(404).json(err));
      } else {
        errors.password = "Password incorrect";
        res.status(400).json(errors);
      }
    });
  });
});

// @route   GET /api/users/shibboleth
// @desc    Login via shibboleth
// @access  Public

// @route   POST api/users/updateaccounttype
// @desc    Update the account type of the user
// @access  Private
router.post(
  "/updateaccounttype",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    if (!(req.user.role === "Admin")) {
      errors.profile = "Unzureichende Berechtigung";
      return res.status(401).json(errors.profile);
    }
    const accountFields = {};
    accountFields.role = req.body.role;
    User.findOneAndUpdate(
      { _id: req.body.userID },
      { $set: accountFields },
      { new: true }
    )
      .then((user) => res.send(user))
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/users/createinvitationkey
// @desc    Update the account type of the user
// @access  Private
router.get(
  "/createinvitationkey",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    if (!(req.user.role === "Admin")) {
      errors.profile = "Unzureichende Berechtigung";
      return res.status(401).json(errors.profile);
    }

    var invitekey = Math.random().toString(36).slice(-10);
    Invitaion.findOne({ invitationkey: invitekey }).then((key) => {
      if (key) {
        errors.key = "Key already exists";
        return res.status(400).json(errors);
      } else {
        const newKey = new Invitaion({
          invitationkey: invitekey,
          usage: "Invitationkey",
        });
        newKey
          .save()
          .then((key) => res.send(key.invitationkey))
          .catch((err) => res.status(404).json(err));
      }
    });
  }
);

// @route   POST /api/users/createpasswordtoken
// @desc    Create Token for Password Reset
// @access  Public
router.post("/createpasswordtoken", (req, res) => {
  User.findOne({ email: req.body.email.toLowerCase() }).then((user) => {
    if (user) {
      crypto.randomBytes(48, function (err, buffer) {
        var newtoken = buffer.toString("hex");
        Token.findOne({ token: newtoken }).then((token) => {
          if (token) {
            errors.token = "Token already exists";
            return res.status(400).json(errors);
          } else {
            const newEntry = new Token({
              token: newtoken,
              usage: "PWReset",
              user: user._id,
            });
            newEntry
              .save()
              .then((key) => {
                //create Transporter
                const transporter = nodemailer.createTransport({
                  host: "mail.in.tum.de",
                  port: 465,
                  auth: {
                    user: mailuser,
                    pass: mailsecret,
                  },
                });
                var mailText = `Hello,

      a password reset Token has been created
      Please click this Link to reset your password:
      
      localhost:8000/resetpassword/${newtoken}
      
      If this has not been you please contact the Tutorstaff

      Sincerely,
      The Tutorteam.`;

                //Get Body Values
                const mailFields = {};
                mailFields.from = "tutorbetrieb@in.tum.de";
                mailFields.to = req.body.email.toLowerCase();
                mailFields.subject = "Password Reset";
                mailFields.text = mailText;
                // send email
                transporter.sendMail(mailFields);
                res.status(200).json({ user: "Token created" });
              })
              .catch((err) => res.status(404).json(err));
          }
        });
      });
    }
  });
});

// @route   POST /api/users/resetpassword/:id
// @desc    Reset User Password
// @access  Public
router.post("/resetpassword/:id", (req, res) => {
  Token.findOne({ token: req.params.id }).then((found) => {
    if (found) {
      crypto.randomBytes(48, function (err, buffer) {
        var token = buffer.toString("hex").slice(-10);
        const newPW = {
          password: token,
        };
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPW.password, salt, (err, hash) => {
            if (err) throw err;
            const newPW = { password: hash };
            User.findOneAndUpdate(
              { _id: found.user },
              { $set: newPW },
              { new: true }
            )
              .then((user) => {
                //create Transporter
                const transporter = nodemailer.createTransport({
                  host: "mail.in.tum.de",
                  port: 465,
                  auth: {
                    user: mailuser,
                    pass: mailsecret,
                  },
                });
                var mailText = `Hello,

      your password has been reset!
      Please login to your account and change it.
      
      Your new password is: ${token}
      
      If this has not been you please contact the Tutorstaff

      Sincerely,
      The Tutorteam.`;
                //Get Body Values
                const mailFields = {};
                mailFields.from = "tutorbetrieb@in.tum.de";
                mailFields.to = user.email.toLowerCase();
                mailFields.subject = "New Password";
                mailFields.text = mailText;
                // send email
                transporter.sendMail(mailFields);
                Token.findOneAndDelete({ token: req.params.id }).then(() =>
                  res.status(200).json({ user: "Password reset" })
                );
              })
              .catch((err) => res.json(err));
          });
        });
      });
    }
  });
});

// @route   POST /api/users/changepassword
// @desc    Change User Password
// @access  Private
router.post(
  "/changepassword",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChangePW(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ _id: req.user.id }).then((user) => {
      //Check Password
      bcrypt.compare(req.body.passwordold, user.password).then((isMatch) => {
        if (isMatch) {
          //OldPW matched Matched
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              const newPW = { password: hash };
              User.findOneAndUpdate(
                { _id: req.user.id },
                { $set: newPW },
                { new: true }
              )
                .then(() => res.status(200).json("Password changed"))
                .catch((err) => res.status(400).json(err));
            });
          });
        } else {
          errors.passwordold = "Password incorrect";
          res.status(400).json(errors);
        }
      });
    });
  }
);

module.exports = router;
