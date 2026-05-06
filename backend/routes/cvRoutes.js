const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cvController");

router.post("/", cvController.createCV);

router.post("/extract", cvController.upload.single('cv'), cvController.extractCVData);

router.get("/", cvController.getAllCVs);

router.get("/user/:userId", cvController.getCVsByUser);

module.exports = router;