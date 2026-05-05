const { Question, Answer, Interview, sequelize } = require("../models");
const { generateInterviewQuestions } = require("../services/aiInterviewQuestionService");


exports.createQuestion = async (req, res) => {
  try {
    const {
      interviewId,
      question_text,
      question_order,
      question_type,
      options
    } = req.body;

    
    const question = await Question.create({
      interviewId,
      question_text,
      question_order,
      question_type
    });

   
    if (options && options.length > 0) {
      const answers = options.map(opt => ({
        option_text: opt.option_text,
        is_correct: opt.is_correct,
        questionId: question.id
      }));

      await Answer.bulkCreate(answers);
    }

    res.status(201).json({
      message: "Question created successfully",
      questionId: question.id
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generateAIQuestions = async (req, res) => {
  let transaction;

  try {
    const { interviewId, saveToInterview = false } = req.body;

    if (saveToInterview && !interviewId) {
      return res.status(400).json({
        success: false,
        error: "interviewId is required when saveToInterview is true"
      });
    }

    if (interviewId) {
      const interview = await Interview.findByPk(interviewId);
      if (!interview) {
        return res.status(404).json({
          success: false,
          error: "Interview not found"
        });
      }
    }

    const generated = await generateInterviewQuestions(req.body);
    let questions = generated.questions;

    if (saveToInterview) {
      transaction = await sequelize.transaction();
      questions = await persistGeneratedQuestions(interviewId, questions, transaction);
      await transaction.commit();
    }

    res.status(saveToInterview ? 201 : 200).json({
      success: true,
      data: {
        questions,
        saved: Boolean(saveToInterview),
        interviewId: interviewId || null
      }
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    const status = error.message.includes("API") || error.message.includes("NVIDIA") ? 502 : 500;

    res.status(status).json({
      success: false,
      error: error.message
    });
  }
};


exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: [
        {
          model: Answer,
          as: "answers"
        }
      ],
      order: [["question_order", "ASC"]]
    });

    res.json(questions);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id, {
      include: [
        {
          model: Answer,
          as: "answers"
        }
      ]
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(question);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getQuestionsByInterview = async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: { interviewId: req.params.interviewId },
      include: [
        {
          model: Answer,
          as: "answers"
        }
      ],
      order: [["question_order", "ASC"]]
    });

    res.json(questions);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.updateQuestion = async (req, res) => {
  try {
    const { question_text, question_order, question_type, options } = req.body;

    const question = await Question.findByPk(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await question.update({
      question_text,
      question_order,
      question_type
    });

   
    if (options) {
      await Answer.destroy({
        where: { questionId: question.id }
      });

      const newAnswers = options.map(opt => ({
        option_text: opt.option_text,
        is_correct: opt.is_correct,
        questionId: question.id
      }));

      await Answer.bulkCreate(newAnswers);
    }

    res.json({ message: "Question updated successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

   
    await Answer.destroy({
      where: { questionId: question.id }
    });

   
    await question.destroy();

    res.json({ message: "Question deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function persistGeneratedQuestions(interviewId, questions, transaction) {
  const savedQuestions = [];

  for (const question of questions) {
    const savedQuestion = await Question.create({
      interviewId,
      question_text: question.questionText,
      question_order: question.questionOrder,
      question_type: question.questionType
    }, { transaction });

    const answers = question.options.map(option => ({
      option_text: option.text,
      is_correct: option.isCorrect,
      questionId: savedQuestion.id
    }));

    await Answer.bulkCreate(answers, { transaction });
    const savedAnswers = await Answer.findAll({
      where: { questionId: savedQuestion.id },
      order: [["id", "ASC"]],
      transaction
    });

    savedQuestions.push({
      ...question,
      id: savedQuestion.id,
      options: savedAnswers.map(answer => ({
        id: String(answer.id),
        text: answer.option_text,
        isCorrect: answer.is_correct
      }))
    });
  }

  return savedQuestions;
}
