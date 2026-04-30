const { Question, Answer } = require("../models");


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
