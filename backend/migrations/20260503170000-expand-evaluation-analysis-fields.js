'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Evaluations', 'ai_feedback', {
      type: Sequelize.TEXT
    });

    await queryInterface.changeColumn('Evaluations', 'strength', {
      type: Sequelize.TEXT
    });

    await queryInterface.changeColumn('Evaluations', 'weaknesess', {
      type: Sequelize.TEXT
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Evaluations', 'ai_feedback', {
      type: Sequelize.STRING
    });

    await queryInterface.changeColumn('Evaluations', 'strength', {
      type: Sequelize.STRING
    });

    await queryInterface.changeColumn('Evaluations', 'weaknesess', {
      type: Sequelize.STRING
    });
  }
};
