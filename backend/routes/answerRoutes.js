const express = require("express");
const router = express.Router();

const {
  createAnswer,
  getAnswers,
  getAnswersByQuestion,
  getAnswerById,
  updateAnswer,
  deleteAnswer
} = require("../controllers/answerController");

// CRUD
router.post("/", createAnswer);
router.get("/", getAnswers);
router.get("/question/:questionId", getAnswersByQuestion);
router.get("/:id", getAnswerById);
router.put("/:id", updateAnswer);
router.delete("/:id", deleteAnswer);

module.exports = router;