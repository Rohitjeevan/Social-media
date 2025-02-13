"use strict";

export default (Sequelize, DataTypes) => {
  const Like = Sequelize.define("Like", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull : false,
      references : {
        model : 'Users',
        key : 'id'
      },
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE',
    },
    postId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      references : {
        model : 'Posts',
        key : 'id'
      },
       onUpdate : 'CASCADE',
       onDelete : 'CASCADE'
    },    
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  return Like;
};
