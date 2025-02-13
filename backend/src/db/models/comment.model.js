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
      postId: {
        type: DataTypes.INTEGER,
        references: {
          
          model: "Posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "Comments",
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
