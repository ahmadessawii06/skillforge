const express = require("express");
const router = express.Router();

const cvController = require("../controllers/cvController");

router.post("/", cvController.createCV);
router.get("/", cvController.getAllCVs);
router.get("/user/:userId", cvController.getCVsByUser);

module.exports = router;