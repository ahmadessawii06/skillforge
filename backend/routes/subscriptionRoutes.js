const express = require("express");
const router = express.Router();

const {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  getSubscriptionsByUser,
  updateSubscription,
  deleteSubscription
} = require("../controllers/subscriptionController");

router.post("/", createSubscription);

router.get("/", getSubscriptions);


router.get("/user/:userId", getSubscriptionsByUser);

router.get("/:id", getSubscriptionById);


router.put("/:id", updateSubscription);

router.delete("/:id", deleteSubscription);


module.exports = router;