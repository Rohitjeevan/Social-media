'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      queryInterface.createTable('follows',{
        id : {
          allowNull:false,
          autoIncrement : true,
          primaryKey:true,
          type : Sequelize.INTEGER
        },
     
        following_id : {
          type : Sequelize.INTEGER,
          allowNull:false,
          references : {
            model : 'users',
            key : 'id'
          },
          onDelete : 'CASCADE',
          onUpdate : 'CASCADE'
        },

        follower_id : {
          type : Sequelize.INTEGER,
          allowNull : false,
          references : {
            model : 'users',
            key : 'id'
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

      await queryInterface.addConstraint('follows',{
        fields : ['follower_id','following_id'],
        type : 'unique',
        name : 'unique_follower_following'
      });

   },

  async down (queryInterface, Sequelize) {
     
     await queryInterface.dropTable('follows');

  }
};
