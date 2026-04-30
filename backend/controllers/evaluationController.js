const { Evaluation } = require("../models");


// ==============================
// ✅ CREATE Evaluation
// ==============================
exports.createEvaluation = async (req, res) => {
  try {
    const {
      interviewId,
      strength,
      weaknesess,
      ai_feedback,
      technical_skills,
      behavior_skills,
      communication
    } = req.body;

    const evaluation = await Evaluation.create({
      interviewId,
      strength,
      weaknesess,
      ai_feedback,
      technical_skills,
      behavior_skills,
      communication
    });

    res.status(201).json(evaluation);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll();
    res.json(evaluations);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getEvaluationById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findByPk(req.params.id);

    if (!evaluation) {
      return res.status(404).json({ message: "Evaluation not found" });
    }

    res.json(evaluation);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getEvaluationByInterview = async (req, res) => {
  try {
    const evaluation = await Evaluation.findOne({
      where: { interviewId: req.params.interviewId }
    });

    if (!evaluation) {
      return res.status(404).json({ message: "Evaluation not found" });
    }

    res.json(evaluation);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findByPk(req.params.id);

    if (!evaluation) {
      return res.status(404).json({ message: "Evaluation not found" });
    }

    await evaluation.update(req.body);

    res.json({ message: "Evaluation updated successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findByPk(req.params.id);

    if (!evaluation) {
      return res.status(404).json({ message: "Evaluation not found" });
    }

    await evaluation.destroy();

    res.json({ message: "Evaluation deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};