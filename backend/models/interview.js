'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interview extends Model {
    
    static associate(models) {
      Interview.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Interview.belongsTo(models.CV, { foreignKey: 'cvId', as: 'cv' });
       Interview.hasOne(models.Evaluation, {
    foreignKey: 'interviewId',
    as: 'evaluation'
  });

  Interview.hasMany(models.Question, {
    foreignKey: 'interviewId',
    as: 'questions'
  });

    }
  }
  Interview.init({
    userId: DataTypes.INTEGER,
    cvId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    total_score: DataTypes.STRING, 
    total_duration: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Interview',
  });
  return Interview;
};