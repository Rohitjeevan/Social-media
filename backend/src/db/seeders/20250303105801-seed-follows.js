"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let follows = [];

    for (let i = 0; i < 100; i++) {
      follows.push({
        created_at: new Date(),
        updated_at: new Date(),
        follower_id: faker.number.int({ min: 220, max: 419 }),  
        following_id: faker.number.int({ min: 220, max: 419 }),
      });
    }

    await queryInterface.bulkInsert("follows", follows, {});
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.bulkDelete('follows',null,{});  
  },
};
