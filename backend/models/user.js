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
        foreignKey: 'userId',
        as: 'subscriptions'
      });
    }
  }

  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
     tableName: 'Users'
  });

  return User;
};