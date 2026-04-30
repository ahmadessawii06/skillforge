const { CV, User } = require("../models");

// Create CV
exports.createCV = async (req, res) => {
  try {
    const { userId, fileName, uploadAt, experience_level, target_job_title } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const cv = await CV.create({
      userId,
      fileName,
      uploadAt,
      experience_level,
      target_job_title
    });

    res.status(201).json({
      message: "CV created successfully",
      cv
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating CV",
      error: error.message
    });
  }
};

// Get all CVs with user info
exports.getAllCVs = async (req, res) => {
  try {
    const cvs = await CV.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName", "email"]
        }
      ]
    });

    res.status(200).json(cvs);

  } catch (error) {
    res.status(500).json({
      message: "Error getting CVs",
      error: error.message
    });
  }
};

// Get CVs for one user with user info
exports.getCVsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const cvs = await CV.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName", "email"]
        }
      ]
    });

    res.status(200).json(cvs);

  } catch (error) {
    res.status(500).json({
      message: "Error getting user CVs",
      error: error.message
    });
  }
};