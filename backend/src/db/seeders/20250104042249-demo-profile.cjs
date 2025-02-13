'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Profiles',[
        {
          bio: 'Jay shree ram',
          image : 'https://image',
          address : 'karanj tarana ujjain mp india',
          userId : 1,
          createdAt: new Date(),
          updatedAt : new Date()
        },
        {
          bio: 'Jay shree krishan',
          image : 'https://image',
          address : 'golva tarana ujjain mp india',
          userId : 4,
          createdAt: new Date(),
          updatedAt : new Date()
        },

      ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
