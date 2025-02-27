'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable("likes",{
       id:{
         type: Sequelize.INTEGER,
         primaryKey : true,
         autoIncrement : true,
         allowNull : false
       },
       post_id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "posts",
          key : "id"
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
       },
       user_id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "users",
          key : "id"
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
       },
       created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      }
     });


     // add a constraints 

     await  queryInterface.addConstraint("likes",{
      fields : ['post_id','user_id'],
      type : 'unique',
      name : 'unique_posts_user_like'
     });

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('likes');
  }
};
