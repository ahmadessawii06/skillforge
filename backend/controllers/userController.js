const { User } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/auth");
// User controller APIs

// 1) Create User / Sign Up
exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      passwordHash,
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
    const { fullName, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required"
      });
    }

    let user = await User.findOne({
      where: { email }
    });

    if (!user) {
      user = await User.create({
        fullName: fullName || email.split("@")[0],
        email,
        passwordHash: await bcrypt.hash(password, 10),
        role: "user"
      });
    }

    const passwordMatches = await comparePassword(password, user.passwordHash);

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
