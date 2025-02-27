'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description : {
         type : Sequelize.STRING,
         allowNull:true, 
      },
     location: {
       type:Sequelize.STRING,
       allowNull:true
      },
      img_url: {
        type: Sequelize.STRING,
        allowNull:true
      },
      like:{
        type:Sequelize.INTEGER,
        allowNull:true,
        defaultValue:0
      },
      comment : {
       type:Sequelize.INTEGER,
       allowNull:true,
       defaultValue:0
      },
      user_id: {
        type:Sequelize.INTEGER,
        references : {
          model : 'users',
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};