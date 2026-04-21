'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CV extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CV.init({
    cv_id: DataTypes.INTEGER,
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