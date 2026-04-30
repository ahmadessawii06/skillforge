const express = require("express");
const router = express.Router();

const interviewController = require("../controllers/interviewController");

router.post("/", interviewController.createInterview);
router.get("/", interviewController.getAllInterviews);
router.get("/user/:userId", interviewController.getInterviewsByUser);

module.exports = router;