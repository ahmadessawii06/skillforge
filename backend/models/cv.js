'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CV extends Model {
    
    static associate(models) {
    CV.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  CV.init({
   userId: DataTypes.INTEGER,
    fileName: DataTypes.STRING,
    uploadAt: DataTypes.DATE,
    experience_level: DataTypes.STRING,
    target_job_title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CV',
  });
  return CV;
};