'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
   
    static associate(models) {
      Subscription.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });
  Subscription.belongsTo(models.Plan, {
    foreignKey: 'planId',
    as: 'plan'
  });
    }
  }
  Subscription.init({

      userId: DataTypes.INTEGER,
        planId: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    status: DataTypes.STRING,
    interviews_used: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};