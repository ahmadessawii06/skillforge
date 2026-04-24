'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscriptions', {
      userId: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'Users',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
},
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     planId: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'Plans',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
},
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      interviews_used: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Subscriptions');
  }
};