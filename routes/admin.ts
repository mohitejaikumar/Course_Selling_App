import express from "express";
import jwt from "jsonwebtoken";
import { SECRET, authenticateJwt } from "../middleware/auth.js";
import { Admin, Course } from "../db/schema.js";

const router = express.Router();

router.get("/me", authenticateJwt, (req, res) => {
  res.json({
    username: req.headers.user,
  });
});
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const obj = { username: username, password: password };
    const newAdmin = new Admin(obj);
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});
// create course
router.post("/courses", authenticateJwt, async (req, res) => {
  const course = req.body;
  const newCourse = new Course(course);
  await newCourse.save();

  res.json({ message: "Course created successfully", courseId: newCourse._id });
});
// get course by id
router.get("/courses/:courseId", authenticateJwt, async (req, res) => {
  const id = req.params.courseId;
  // findById -----> great

  const course = await Course.findById(id);
  // console.log(course);
  if (course) {
    res.json({ course: course });
  } else {
    res.json({ message: "course do not exist" });
  }
});
// update course
router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });

  if (course) {
    await course.save();

    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});
// get all courses
router.get("/courses", authenticateJwt, async (req, res) => {
  // find---> all
  const courses = await Course.find({});
  console.log(courses);
  res.json({ courses });
});

// very important
export default router;
