import { where } from "sequelize";
import { ServiceBase } from "../../libs/serviceBase.js";



export class LikeService extends ServiceBase {
    
    async run () {
        const { 
            dbModels: {Like,Post},
        } = this.context;

        const {userId,postId} = this.args;

        const like = await Like.findAll({
                where : {
                    postId : postId,
                    userId : userId
                }
        })
         
        const post = await Post.findByPk(postId); 
        
        if(like.length ===  0 ){
            
            await Post.update(
                 { like : post.like + 1 },
                 {
                    where : {
                        id : postId
                    }
                 }
            )

            const like = await Like.create({
                postId : postId,
                userId : userId
            })
         
            return { message: "Post like Successful " };
        } else {
              
            await Post.update(
                { like : post.like - 1 },
                {
                   where : {
                       id : postId
                   }
                }
           ) 

           await Like.destroy({
                where : {
                     postId : postId,
                     userId : userId
                }
           })

            return { message : "Post DisLike Successful " };
        }

    }

}