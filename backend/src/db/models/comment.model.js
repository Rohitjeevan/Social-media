"use strict";

export default (Sequelize, DataTypes) => {
  const Comment = Sequelize.define(
    "Comment",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
        allowNull : false,
        allowNull:false
      },
      like: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      comment: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }
    },
    {
      tableName: "comments",
      timestamps: true,
    });

    Comment.associate = (models ) => {
      Comment.belongsTo(models.Post,{
        foreignKey: 'postId',
        as  : 'comments'
      });
    }
  
  return Comment;
};
