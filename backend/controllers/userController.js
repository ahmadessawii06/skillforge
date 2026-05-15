const { User, CV, Interview, Evaluation } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/auth");
// 1) Create User / Sign Up
exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password, passwordHash, role } = req.body;

    const plainPassword = password || passwordHash;

    if (!fullName || !email || !plainPassword) {
      return res.status(400).json({
        message: "fullName, email, and password are required"
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = await User.create({
      fullName,
      email,
      passwordHash: hashedPassword,
      role: role || "user"
    });

    const token = generateToken(buildTokenPayload(user));

    const responseUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: responseUser,
      data: {
        message: "User created successfully",
        token,
        user: responseUser
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message
    });
  }
};

// 2) Login User
exports.loginUser = async (req, res) => {
  try {
    const {email, password, passwordHash } = req.body;

    const finalPassword = password || passwordHash;

    if (!email || !finalPassword) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required"
      });
    }

    let user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found"
      });
    }
    const passwordMatches = await comparePassword(finalPassword, user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        error: "Incorrect password"
      });
    }

    const token = generateToken(buildTokenPayload(user));

    const responseUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: responseUser,
      data: {
        message: "Login successful",
        token,
        user: responseUser
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message
    });
  }
};

function buildTokenPayload(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.role || "user"
  };
}

async function comparePassword(password, storedPassword) {
  if (!storedPassword) return false;

  if (storedPassword.startsWith("$2")) {
    return bcrypt.compare(password, storedPassword);
  }

  return password === storedPassword;
}

// 3) Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "fullName", "email", "role"]
    });

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: "Error getting users",
      error: error.message
    });
  }
};

// 4) Get User By ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ["id", "fullName", "email", "role"]
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: "Error getting user",
      error: error.message
    });
  }
};
// Get Current User Profile
exports.getProfile = async (req, res) => {

  try {

    const user = await User.findByPk(req.user.id, {

      attributes: ["id", "fullName", "email", "role"],

      include: [

        {
          model: CV,
          as: "cvs",
          attributes: ["id"]
        },

        {
          model: Interview,
          as: "interviews",
          attributes: ["id"],

          include: [
            {
              model: Evaluation,
              as: "evaluation",
              attributes: ["score"]
            }
          ]
        }

      ]

    });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    const interviewsCount = user.interviews.length;

    const cvsCount = user.cvs.length;

    let averageScore = 0;

    const scores = user.interviews
      .map(i => i.evaluation?.score)
      .filter(score => score !== undefined);

    if (scores.length > 0) {

      averageScore =
        scores.reduce((a, b) => a + b, 0) / scores.length;

    }

    res.status(200).json({

      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,

      stats: {
        interviewsCount,
        cvsCount,
        averageScore: averageScore.toFixed(1)
      }

    });

  } catch (error) {

    res.status(500).json({
      message: "Error getting profile",
      error: error.message
    });

  }

};