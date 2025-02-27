import { where } from "sequelize";
import { ServiceBase } from "../../libs/serviceBase.js";



export class LikeService extends ServiceBase {
    
    async run () {
        const { 
            dbModels: {Like,Post},
        } = this.context;

        const {post_id,dataValues:authUser} = this.args;

        const post = await Post.findByPk(post_id);
    
        if(!post) return this.addError("PostDoesNotExits");

        const like = await Like.findOne({
              where : {post_id : post_id,user_id: authUser.id}
        });
        
        if(like) return this.addError('AlreadyLikedError');
        
        await Like.create({
            post_id : post_id,
            user_id : authUser.id
        });
      
        await post.increment('like');
             
        return {message : 'Post like successfully'}

    }

}