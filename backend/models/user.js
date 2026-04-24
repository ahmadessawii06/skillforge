'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
     user.hasMany (models.cv,{
      foreignKey: 'user_id',
      as: 'cvs'
     }
     )
     user.hasMany (models.interviwe,{
      foreignKey: 'user_id',
      as: 'interviwes'
     }
    )
    user.hasMany(models.subscription,{
      foreignKey: 'user_id',
      as: 'subscriptions'
    }
  )
    }
  }
  User.init({
    user_id: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};