const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getQuestions,
  getQuestionById,
  getQuestionsByInterview,
  generateAIQuestions,
  updateQuestion,
  deleteQuestion
} = require("../controllers/questionController");


router.post("/", createQuestion);

router.post("/ai/generate", generateAIQuestions);

router.get("/ai/models", async (req, res) => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || process.env.NVIDIA_NIM_API_KEY}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", getQuestions);

router.get("/interview/:interviewId", getQuestionsByInterview);


router.get("/:id", getQuestionById);

router.put("/:id", updateQuestion);

router.delete("/:id", deleteQuestion);


module.exports = router;
