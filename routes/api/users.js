const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const crypto = require("crypto");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User model
const User = require("../../models/User");

//Load Invitation model
const Invitaion = require("../../models/Invitation");

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
            .then((user) => res.json(user))
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
    //TODO: Change Back to two days - This was changed for testing purposes
    var twodays = 20 * 24 * 60 * 60 * 1000; /* ms */
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

// @route   POST api/users/updateaccounttype
// @desc    Update the account type of the user
// @access  Private
router.post(
  "/updateaccounttype",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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

module.exports = router;
