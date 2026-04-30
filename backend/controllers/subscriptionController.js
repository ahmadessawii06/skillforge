const { Subscription, User, Plan } = require("../models");


exports.createSubscription = async (req, res) => {
  try {
    const {
      userId,
      planId,
      start_date,
      end_date,
      status,
      interviews_used
    } = req.body;

    const subscription = await Subscription.create({
      userId,
      planId,
      start_date,
      end_date,
      status,
      interviews_used
    });

    res.status(201).json(subscription);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.findAll({
      include: [
        { model: User, as: "user" },
        { model: Plan, as: "plan" }
      ]
    });

    res.json(subs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubscriptionById = async (req, res) => {
  try {
    const sub = await Subscription.findByPk(req.params.id, {
      include: [
        { model: User, as: "user" },
        { model: Plan, as: "plan" }
      ]
    });

    if (!sub) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.json(sub);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getSubscriptionsByUser = async (req, res) => {
  try {
    const subs = await Subscription.findAll({
      where: { userId: req.params.userId },
      include: [
        { model: Plan, as: "plan" }
      ]
    });

    res.json(subs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findByPk(req.params.id);

    if (!sub) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    await sub.update(req.body);

    res.json({ message: "Subscription updated successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findByPk(req.params.id);

    if (!sub) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    await sub.destroy();

    res.json({ message: "Subscription deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};