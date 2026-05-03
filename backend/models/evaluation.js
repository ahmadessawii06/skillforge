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
    strength: DataTypes.TEXT,
    weaknesess: DataTypes.TEXT,
    ai_feedback: DataTypes.TEXT,
    technical_skills: DataTypes.STRING,
    behavior_skills: DataTypes.STRING,
    communication: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Evaluation',
  });
  return Evaluation;
};
