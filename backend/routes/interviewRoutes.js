const express = require("express");
const router = express.Router();

const interviewController = require("../controllers/interviewController");
const { checkAnalysisStatus } = require("../controllers/analysisController");

router.post("/", interviewController.createInterview);
router.get("/", interviewController.getAllInterviews);
router.get("/:interviewId/analysis/status", checkAnalysisStatus);
router.get("/user/:userId", interviewController.getInterviewsByUser);
router.get("/:id", interviewController.getInterviewById);

module.exports = router;
