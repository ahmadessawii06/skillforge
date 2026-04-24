'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    
    static associate(models) {
      Question.belongsTo(models.Interview, { foreignKey: 'interviewId', as: 'interview' });
      Question.hasMany(models.Answer, {
        foreignKey: 'questionId',
        as: 'answers'
      });
    }
  }
  Question.init({
    interviewId: DataTypes.INTEGER,
    question_text: DataTypes.STRING,
    question_order: DataTypes.INTEGER,
    question_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};