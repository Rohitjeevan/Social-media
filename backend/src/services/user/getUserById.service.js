import { col, fn } from "sequelize";
import { ServiceBase } from "../../libs/serviceBase";


export class GetUserById extends ServiceBase {
    async run () {

        const {dbModels:{User,Post,Follow}}  = this.context;
        
        const {id} = this.args;
 
        const user = await User.findByPk(id,{
            attributes:['id','name','age'],
            include : [
                {
                    model : Post,
                    as : 'posts'
                },
                {
                    model : Follow,
                    as : 'follower'
                },
                {
                    model : Follow,
                    as : 'following'
                }
            ]
        },
      
    );

        if(!user) return this.addError('UserNotFoundError');

        return {user}; 
        
    }
}