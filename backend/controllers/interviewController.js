const { Interview, User, CV } = require("../models");

exports.createInterview = async (req, res) => {
  try {
    const { userId, cvId, status, total_score, total_duration } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cv = await CV.findByPk(cvId);
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    if (cv.userId !== userId) {
      return res.status(400).json({
        message: "This CV does not belong to this user"
      });
    }

    const interview = await Interview.create({
      userId,
      cvId,
      status: status || "in_progress",
      total_score,
      total_duration
    });

    res.status(201).json({
      message: "Interview created successfully",
      interview
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating interview",
      error: error.message
    });
  }
};

exports.getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName", "email"]
        },
        {
          model: CV,
          as: "cv"
        }
      ]
    });

    res.status(200).json(interviews);

  } catch (error) {
    res.status(500).json({
      message: "Error getting interviews",
      error: error.message
    });
  }
};

exports.getInterviewsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const interviews = await Interview.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName", "email"]
        },
        {
          model: CV,
          as: "cv"
        }
      ]
    });

    res.status(200).json(interviews);

  } catch (error) {
    res.status(500).json({
      message: "Error getting user interviews",
      error: error.message
    });
  }
};