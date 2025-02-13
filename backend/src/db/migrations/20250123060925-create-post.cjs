'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
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
        allowNull:true 
      },
      comment : {
       type:Sequelize.STRING,
       allowNull:true
      },
      userId : {
        type:Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};