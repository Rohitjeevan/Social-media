'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        let users = new Set();
        
        while(users.size < 100){
           users.add(faker.internet.email());
        }

        users = [...users];

        let userData = users.map((email) => ({
          name: faker.person.fullName(), 
          email,
          password: bcrypt.hashSync('action@1234', 10), 
          age: faker.number.int({ min: 18, max: 60 }), 
          city: faker.location.city(), 
          mobile: faker.string.numeric(12), 
          dob: faker.date.birthdate({min:15,max: 60,mode : 'age'}),
          gender : faker.helpers.arrayElement(['Male','Female','Other']),
          created_at: new Date(),
          updated_at: new Date(),
        }));

        await queryInterface.bulkInsert('users',userData,{});

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('users',null,{});
  }

};
