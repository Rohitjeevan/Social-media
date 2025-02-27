"use strict";

export default (Sequelize, DataTypes) => {
  const Like = Sequelize.define('Like', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull : false,
      references : {
        model : 'users',
        key : 'id'
      },
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE',
    },
    post_id: {
      type : DataTypes.INTEGER,
      allowNull : false,
      references : {
        model : 'posts',
        key : 'id'
      },
       onUpdate : 'CASCADE',
       onDelete : 'CASCADE'
    },  
  },
  {
    tableName: 'likes',
    timestamps : true
  }

);

  return Like;
};
