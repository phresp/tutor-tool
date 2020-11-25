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

// @route   GET /api/course/:id
// @desc    Get Course by id
// @access  Private
router.get("/:id", (req, res) => {
  const errors = {};
  Course.findOne({ _id: req.params.id })
    .then((course) => {
      res.json(course);
    })
    .catch((err) =>
      res.status(404).json({ coursenotfound: "Course not found" })
    );
});

// @route   POST /api/course
// @desc    Create Course
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate Input fields
    const { errors, isValid } = validateCourseInput(req.body);
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }
    //Get Metacourse ID
    var metacourseOfInput;
    var semesterOfInput;
    Metacourse.findOne({ name: req.body.metacourse }).then((meta) => {
      if (meta) {
        metacourseOfInput = meta._id;
        //Get Semester ID
        Semester.findOne({ name: req.body.semester }).then((sem) => {
          if (sem) {
            semesterOfInput = sem._id;
            Course.findOne({
              metacourse: metacourseOfInput,
              semester: semesterOfInput,
            }).then((course) => {
              //Check if Course Name is already there
              if (course) {
                errors.course = "Course already exists";
                return res.status(400).json(errors);
              } else {
                //If Course does not exist create
                //Get Body Fields
                const courseFields = {};
                courseFields.metacourse = metacourseOfInput;
                courseFields.semester = semesterOfInput;
                courseFields.studentnumber = req.body.studentnumber;
                courseFields.groupenumber = req.body.groupenumber;
                courseFields.groupsize = req.body.groupsize;
                courseFields.tutorialhours = req.body.tutorialhours;
                courseFields.homework = req.body.homework;
                courseFields.exam = req.body.exam;
                courseFields.midterm = req.body.midterm;
                courseFields.groupspertutor = req.body.groupspertutor;
                courseFields.maxtutornumber = req.body.maxtutornumber;
                courseFields.weeklyhourspertutor = req.body.weeklyhourspertutor;
                courseFields.overallhours = req.body.overallhours;
                courseFields.from = req.body.from;
                courseFields.till = req.body.till;
                courseFields.weeks = req.body.weeks;
                courseFields.requirement = req.body.requirement;
                courseFields.admin = req.body.admin;
                courseFields.advisor = req.body.advisor;

                //Create Course
                new Course(courseFields)
                  .save()
                  .then((course) => res.json(course));
              }
            });
          } else {
            return res.status(400).json("No Semester found");
          }
        });
      } else {
        return res.status(400).json("No Metacourse found");
      }
    });
  }
);

// @route   POST api/course/:id
// @desc    Edit Course
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCourseInput(req.body);
    //Check validation
    if (!isValid) {
      //If not valid, send 400 with errors
      return res.status(400).json(errors);
    }

    //Get Metacourse ID
    var metacourseOfInput;
    var semesterOfInput;
    Metacourse.findOne({ name: req.body.metacourse }).then((meta) => {
      if (meta) {
        metacourseOfInput = meta._id;
        //Get Semester ID
        Semester.findOne({ name: req.body.semester }).then((sem) => {
          if (sem) {
            semesterOfInput = sem._id;
            Course.findOne({
              metacourse: metacourseOfInput,
              semester: semesterOfInput,
            }).then((course) => {
              if (course && course._id != req.params.id) {
                errors.course = "Course already exists like this";
                return res.status(400).json(errors);
              } else {
                //If there are no errors update
                //Get Body Fields
                const courseFields = {};
                courseFields.metacourse = metacourseOfInput;
                courseFields.semester = semesterOfInput;
                courseFields.studentnumber = req.body.studentnumber;
                courseFields.groupenumber = req.body.groupenumber;
                courseFields.groupsize = req.body.groupsize;
                courseFields.tutorialhours = req.body.tutorialhours;
                courseFields.homework = req.body.homework;
                courseFields.exam = req.body.exam;
                courseFields.midterm = req.body.midterm;
                courseFields.groupspertutor = req.body.groupspertutor;
                courseFields.maxtutornumber = req.body.maxtutornumber;
                courseFields.weeklyhourspertutor = req.body.weeklyhourspertutor;
                courseFields.overallhours = req.body.overallhours;
                courseFields.from = req.body.from;
                courseFields.till = req.body.till;
                courseFields.weeks = req.body.weeks;
                courseFields.requirement = req.body.requirement;
                courseFields.admin = req.body.admin;
                courseFields.advisor = req.body.advisor;

                //Update
                Course.findOneAndUpdate(
                  { _id: req.params.id },
                  { $set: courseFields },
                  { new: true }
                )
                  .then((course) => res.json(course))
                  .catch((err) =>
                    res.status(404).json({ nocoursefound: "Course not found" })
                  );
              }
            });
          } else {
            return res.status(400).json("No Semester found");
          }
        });
      } else {
        return res.status(400).json("No Metacourse found");
      }
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