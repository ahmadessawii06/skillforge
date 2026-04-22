'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Evaluations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      evaluation_id: {
        type: Sequelize.INTEGER
      },
      strength: {
        type: Sequelize.STRING
      },
      weaknesess: {
        type: Sequelize.STRING
      },
      ai_feedback: {
        type: Sequelize.STRING
      },
      technical_skills: {
        type: Sequelize.STRING
      },
      behavior_skills: {
        type: Sequelize.STRING
      },
      communication: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Evaluations');
  }
};