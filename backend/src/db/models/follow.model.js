export default (sequelize,DataTypes) => {
    const Follow = sequelize.define('Follow', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },
        following_id : {
            type : DataTypes.INTEGER,
            allowNull:false,
            references : {
              model : 'users',
              key : 'id'
            },
            onDelete : 'CASCADE',
            onUpdate : 'CASCADE'
          },
  
          follower_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
              model : 'users',
              key : 'id'
            },
            onDelete : 'CASCADE',
            onUpdate : 'CASCADE'
          }
    });
    
    Follow.associate = ({User}) => {
      Follow.belongsTo(User,{foreignkey: 'follower_id', as : 'following'});
      Follow.belongsTo(User,{foreignkey: "following_id", as : "Follower"})
    }

    return Follow;
}