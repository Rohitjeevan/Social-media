

export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eligible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    // User.hasOne(models.Profile,{
    //   foreignKey: 'userId',
    //   as : 'profile'
    // })

       User.hasMany(models.Profile,{
         foreignKey: 'userId',
         as : 'profiles'
       })
  }

  return User;
};
