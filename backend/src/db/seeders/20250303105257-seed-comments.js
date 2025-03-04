"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let comments = [];

    for (let i = 0; i < 100; i++) {
      comments.push({
        description: faker.lorem.sentence(),
        like: 0,
        comment: 0,
        post_id: faker.number.int({ min: 206, max: 305 }),
        user_id: faker.number.int({ min: 220, max: 419 }),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    queryInterface.bulkInsert('comments',comments,{});
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('comments',null,{});
  },
};
