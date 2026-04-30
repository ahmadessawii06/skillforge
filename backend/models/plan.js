'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {
      Plan.hasMany(models.Subscription, {
        foreignKey: 'planId',
        as: 'subscriptions'
      });
    }
  }

  Plan.init({
    plan_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    interviews_limit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Plan',
  });

  return Plan;
};