'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'Users',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          login: { type: Sequelize.STRING, allowNull: false },
          email: { type: Sequelize.STRING, allowNull: true, default: null },
          role: { type: Sequelize.ENUM('user', 'admin') },
          is_verified: { type: Sequelize.TINYINT, default: 0 },
          password: { type: Sequelize.STRING, allowNull: false },
          password_salt: { type: Sequelize.STRING, allowNull: false },
          last_login: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: null,
          },
          created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
          },
        },
        { transaction },
      );
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('Users', { transaction });
    });
  },
};
