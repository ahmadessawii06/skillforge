'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evaluation extends Model {
    
    static associate(models) {
        Evaluation.belongsTo(models.Interview, { foreignKey: 'interviewId', as: 'interview' });
      }
  }
  Evaluation.init({
    interviewId: DataTypes.INTEGER,
    strength: DataTypes.STRING,
    weaknesess: DataTypes.STRING,
    ai_feedback: DataTypes.STRING,
    technical_skills: DataTypes.STRING,
    behavior_skills: DataTypes.STRING,
    communication: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Evaluation',
  });
  return Evaluation;
};