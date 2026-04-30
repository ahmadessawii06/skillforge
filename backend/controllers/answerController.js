const { Answer } = require("../models");

exports.createAnswer = async (req, res) => {
  try {
    const { option_text, is_correct, questionId } = req.body;

    const answer = await Answer.create({
      option_text,
      is_correct,
      questionId
    });

    res.status(201).json(answer);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAnswers = async (req, res) => {
  try {
    const answers = await Answer.findAll();
    res.json(answers);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getAnswersByQuestion = async (req, res) => {
  try {
    const answers = await Answer.findAll({
      where: { questionId: req.params.questionId }
    });

    res.json(answers);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAnswerById = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res.json(answer);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.updateAnswer = async (req, res) => {
  try {
    const { option_text, is_correct } = req.body;

    const answer = await Answer.findByPk(req.params.id);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    await answer.update({
      option_text,
      is_correct
    });

    res.json({ message: "Answer updated successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    await answer.destroy();

    res.json({ message: "Answer deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};