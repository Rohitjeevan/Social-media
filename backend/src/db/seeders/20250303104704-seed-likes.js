'use strict';
const { faker} = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let likes = [];

     for(let i = 0; i < 100; i ++){
      likes.push({
        post_id : faker.number.int({min:206,max:305}),
        user_id: faker.number.int({ min: 220, max: 419 }),
      })
     }

     queryInterface.bulkInsert('likes',likes,{});
  },

  async down (queryInterface, Sequelize) {
      queryInterface.bulkDelete('likes',null,{});
  }
};
