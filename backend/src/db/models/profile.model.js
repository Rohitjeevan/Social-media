'use strict';

export default(sequelize,DataTypes) => {
   const Profile = sequelize.define('Profile',{
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    bio: {
      type: DataTypes.STRING
    },
    image: {
      type:DataTypes.STRING,
      allowNull:false
    },
    address : {
     type : DataTypes.STRING,
     allowNull:false
    },
    userId : {
       type : DataTypes.INTEGER,
       references : {
        model : 'Users',
        key : 'id'
       },
       onUpdate : 'CASCADE',
       onDelete : 'CASCADE'
    },
   },
   {
    tableName : 'Profiles',
    timestamps : true
  });

  Profile.associate = (models ) => {
    Profile.belongsTo(models.User,{
      foreignKey: 'userId',
      as  : 'user'
    });

  }

  
  return Profile;
}