'use strict';
const { faker, fa } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     
    let posts = [];
    
      for(let i = 0; i < 100; i ++){
        posts.push({
           description : faker.lorem.sentence(),
           location : faker.location.city(),
           img_url : faker.image.avatar(),
           created_at: new Date(),
          updated_at: new Date(),
          user_id : faker.number.int({ min: 220, max: 419 })
        })
      }

      await queryInterface.bulkInsert('posts',posts,{});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('posts',null,{});
  }
};
