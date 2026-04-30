const { Plan, Subscription } = require("../models");

exports.createPlan = async (req, res) => {
  try {
    const { plan_name, price, interviews_limit } = req.body;

    const plan = await Plan.create({
      plan_name,
      price,
      interviews_limit
    });

    res.status(201).json(plan);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll({
      include: [
        {
          model: Subscription,
          as: "subscriptions"
        }
      ]
    });

    res.json(plans);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id, {
      include: [
        {
          model: Subscription,
          as: "subscriptions"
        }
      ]
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(plan);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    await plan.update(req.body);

    res.json({ message: "Plan updated successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    await plan.destroy();

    res.json({ message: "Plan deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};