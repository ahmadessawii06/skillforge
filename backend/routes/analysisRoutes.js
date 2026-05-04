const express = require("express");
const router = express.Router();

const {
  getAnalysis,
  generateInterviewAnalysis
} = require("../controllers/analysisController");

router.get("/:interviewId", getAnalysis);
router.post("/:interviewId/generate", generateInterviewAnalysis);
router.post("/:interviewId/regenerate", generateInterviewAnalysis);

module.exports = router;
