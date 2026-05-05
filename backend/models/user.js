'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.CV, {
        foreignKey: 'userId',
        as: 'cvs'
      });

      User.hasMany(models.Interview, {
        foreignKey: 'userId',
        as: 'interviews'
      });

      User.hasMany(models.Subscription, {
        foreignKey: 'user_id',
        as: 'subscriptions'
      });
    }
  }

  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};