import { ServiceBase } from "../../libs/serviceBase";


export class DisLikeService extends ServiceBase {
    async run ()  {

        const {dbModels:{Like,Post}} = this.context;
       
        const {post_id,dataValues:authUser} = this.args;
   
        const post = await Post.findByPk(post_id);
    
        if(!post) return this.addError("PostDoesNotExits");

        const like = await Like.findOne({
              where : {post_id : post_id,user_id: authUser.id}
        });
        
        if(!like) return this.addError('LikeNotFoundError');
        
        await Like.destroy({
           where : {
            post_id : post_id,
            user_id : authUser.id
           }
        });
      
        await post.decrement('like');
             
        return {message : 'Post Dislike successfully'}

    }  
}