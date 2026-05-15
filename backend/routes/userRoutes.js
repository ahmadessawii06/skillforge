const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);

router.get("/profile", authenticate, userController.getProfile);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

// Admin CRUD
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
module.exports = router;