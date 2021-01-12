const isEmpty = require("../../validation/is-empty");

const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Course = require("../../models/Course");
const Metacourse = require("../../models/Metacourse");
const Semester = require("../../models/Semester");

const validateCourseInput = require("../../validation/course");

// @route   GET /api/course/test
// @desc    Test course route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Course Works" }));

// @route   GET api/course/
// @desc    Get all courses
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Course.find()
      .populate("metacourse", ["name"])
      .populate("semester", ["name"])
      .then((course) => {
        if (!course) {
          errors.course = "There are no courses";
          return res.status(404).json(errors);
        }
        res.json(course);
      })
      .catch((err) => res.status(404).json({ course: "There are no Courses" }));
  }
);

// @route   GET api/course/status/openforapply
// @desc    Get all courses that are open for apply
// @access  Private
router.get(
  "/status/openforapply",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Course.find({ status: "Open" })
      .populate("metacourse", ["name", "abbreviation"])
      .populate("semester", ["name"])
      .then((course) => {
        if (!course) {
          errors.course = "There are no courses";
          return res.status(404).json(errors);
        } else {
        }
        res.json(course);
      })
      .catch((err) => res.status(404).json({ course: "There are no courses" }));
  }
);

// @route   GET /api/course/:id
// @desc    Get Course by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Course.findOne({ _id: req.params.id })
      .populate("metacourse", ["name"])
      .populate("semester", ["name"])
      .then((course) => {
        res.json(course);
      })
      .catch((err) =>
        res.status(404).json({ coursenotfound: "Course not found" })
      );
  }
);

// @route   GET /api/course/advisor/mycourses
// @desc    Get Courses for advisor
// @access  Private
router.get(
  "/advisor/mycourses",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Course.find({ advisor: req.user.id })
      .populate("metacourse", ["name"])
      .populate("semester", ["name"])
      .then((courses) => {
        res.json(courses);
      })
      .catch((err) =>
        res.status(404).json({ coursenotfound: "No courses yet" })
      );
  }
);

//TODO: change name to id in pot /api/course

// @route   POST /api/course
// @desc    Create Course
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate Input fields
    var errors = {};
    //Get Metacourse ID
    const semester = !isEmpty(req.body.semester) ? req.body.semester : "";
    const metacourse = !isEmpty(req.body.metacourse) ? req.body.metacourse : "";
    var metacourseOfInput;
    var semesterOfInput;

    Metacourse.findOne({ name: metacourse })
      .then((meta) => {
        if (meta) {
          metacourseOfInput = meta._id;

          //Get Semester ID
          Semester.findOne({ name: semester })
            .then((sem) => {
              if (sem) {
                semesterOfInput = sem._id;
                Course.findOne({
                  metacourse: metacourseOfInput,
                  semester: semesterOfInput,
                }).then((course) => {
                  //Check if Course is already there
                  if (course) {
                    errors.metacourse = "Course already exists";
                    errors.semester = "Course already exists";
                    return res.status(400).json(errors);
                  } else {
                    //If Course does not exist create
                    //Get Body Fields
                    const courseFields = {};
                    courseFields.metacourse = metacourseOfInput;
                    courseFields.semester = semesterOfInput;
                    courseFields.studentnumber = req.body.studentnumber;
                    courseFields.groupnumber = req.body.groupnumber;
                    courseFields.groupsize = req.body.groupsize;
                    courseFields.tutorialhours = req.body.tutorialhours;
                    courseFields.homework = req.body.homework;
                    courseFields.exam = req.body.exam;
                    courseFields.midterm = req.body.midterm;
                    courseFields.groupspertutor = req.body.groupspertutor;
                    courseFields.maxtutornumber = req.body.maxtutornumber;
                    courseFields.weeklyhourspertutor =
                      req.body.weeklyhourspertutor;
                    courseFields.overallhours = req.body.overallhours;
                    courseFields.from = req.body.from;
                    courseFields.till = req.body.till;
                    courseFields.weeks = req.body.weeks;
                    courseFields.requirement = req.body.requirement;
                    //courseFields.admin = req.body.admin;
                    courseFields.advisor = req.body.advisor;

                    //Create Course
                    new Course(courseFields)
                      .save()
                      .then((course) => res.json(course));
                  }
                });
              } else {
                errors.semester = "Semester not found";
                return res.status(402).json(errors);
              }
            })
            .catch((err) => {
              errors.semester = "Semester not found";
              res.status(403).json(errors);
            });
        } else {
          errors.metacourse = "Metacourse not found";
          return res.status(404).json(errors);
        }
      })
      .catch((err) => {
        errors.metacourse = "Metacourse not found";
        res.status(405).json(errors);
      });
  }
);

//TODO: change name to id in post /api/course/:id

// @route   POST api/course/:id
// @desc    Edit Course
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate Input fields
    var errors = {};
    //Get Metacourse ID
    const semester = !isEmpty(req.body.semester) ? req.body.semester : "";
    const metacourse = !isEmpty(req.body.metacourse) ? req.body.metacourse : "";
    var metacourseOfInput;
    var semesterOfInput;
    Metacourse.findOne({ name: metacourse })
      .then((meta) => {
        if (meta) {
          metacourseOfInput = meta._id;
          //Get Semester ID
          Semester.findOne({ name: semester })
            .then((sem) => {
              if (sem) {
                semesterOfInput = sem._id;
                Course.findOne({
                  metacourse: metacourseOfInput,
                  semester: semesterOfInput,
                }).then((course) => {
                  //Check if Course is already there
                  if (course && course._id != req.params.id) {
                    errors.metacourse = "Course already exists";
                    errors.semester = "Course already exists";
                    return res.status(400).json(errors);
                  } else {
                    //If Course does not exist create or if its the same course
                    //Get Body Fields
                    const courseFields = {};
                    courseFields.metacourse = metacourseOfInput;
                    courseFields.semester = semesterOfInput;
                    courseFields.studentnumber = req.body.studentnumber;
                    courseFields.groupnumber = req.body.groupnumber;
                    courseFields.groupsize = req.body.groupsize;
                    courseFields.tutorialhours = req.body.tutorialhours;
                    courseFields.homework = req.body.homework;
                    courseFields.exam = req.body.exam;
                    courseFields.midterm = req.body.midterm;
                    courseFields.groupspertutor = req.body.groupspertutor;
                    courseFields.maxtutornumber = req.body.maxtutornumber;
                    courseFields.weeklyhourspertutor =
                      req.body.weeklyhourspertutor;
                    courseFields.overallhours = req.body.overallhours;
                    courseFields.from = req.body.from;
                    courseFields.till = req.body.till;
                    courseFields.weeks = req.body.weeks;
                    courseFields.requirement = req.body.requirement;
                    courseFields.status = req.body.status;
                    //courseFields.admin = req.body.admin;
                    courseFields.advisor = req.body.advisor;

                    //Update
                    Course.findOneAndUpdate(
                      { _id: req.params.id },
                      { $set: courseFields },
                      { new: true }
                    )
                      .then((course) => res.json(course))
                      .catch((err) =>
                        res
                          .status(400)
                          .json({ nocoursefound: "Course not found" })
                      );
                  }
                });
              } else {
                errors.semester = "Semester not found";
                return res.status(402).json(errors);
              }
            })
            .catch((err) => {
              errors.semester = "Semester not found";
              res.status(403).json(errors);
            });
        } else {
          errors.metacourse = "Metacourse not found";
          return res.status(404).json(errors);
        }
      })
      .catch((err) => {
        errors.metacourse = "Metacourse not found";
        res.status(405).json(errors);
      });
  }
);

// TODO: FURTHER REMOVES THAT COME WITH REMOVED COURSE
// @route   DELETE /api/course/:id
// @desc    DELETE Course
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.findById(req.params.id)
      .then((course) => {
        // Delete
        course.remove().then(() => res.status(200).json({ success: true }));
      })
      .catch((err) => {
        res.status(404).json({ coursenotfound: "Course not found" });
      });
  }
);

module.exports = router;
