'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
       queryInterface.addColumn(
        'Users',
        'dob',
        {
          type:Sequelize.DATE,
          allowNull:true
        },
       ),
       queryInterface.addColumn(
        "Users",
        'mobile',
        {
          type: Sequelize.STRING(12),
          allowNull:true
        },
       ),
       queryInterface.addColumn(
        'Users',
        'gender',
        {
          type: Sequelize.STRING,
          allowNull:true
        },
       )

    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('Users','dob'),
      queryInterface.removeColumn('Users','mobile'),
      queryInterface.removeColumn('Users','gender')
    ])
  }
};
