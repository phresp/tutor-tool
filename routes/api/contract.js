const isEmpty = require("../../validation/is-empty");

const express = require("express");
const router = express.Router();
const passport = require("passport");

const Application = require("../../models/Application");

//Load Profile Model
const Profile = require("../../models/Profile");

//Load User model
const User = require("../../models/User");

// @route   GET /api/application/test
// @desc    Test application route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Contrtact Works" }));

module.exports = router;
