'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
   
    static associate(models) {
      Answer.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
    }
  }
  Answer.init({
    option_text: DataTypes.STRING,
    is_correct: DataTypes.BOOLEAN,
    questionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};