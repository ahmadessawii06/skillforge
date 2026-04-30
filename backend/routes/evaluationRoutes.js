const express = require("express");
const router = express.Router();

const {
  createEvaluation,
  getEvaluations,
  getEvaluationById,
  getEvaluationByInterview,
  updateEvaluation,
  deleteEvaluation
} = require("../controllers/evaluationController");

router.post("/", createEvaluation);

router.get("/", getEvaluations);

router.get("/interview/:interviewId", getEvaluationByInterview);

router.get("/:id", getEvaluationById);

router.put("/:id", updateEvaluation);

router.delete("/:id", deleteEvaluation);


module.exports = router;