import { ServiceBase } from "../../libs/serviceBase.js";



export class GetPostService extends ServiceBase {
     
    async run(){
          const {dbModels:{Post,Comment} } = this.context;
          
          const {dataValues:authUser} = this.args;

          const posts = await Post.findAll({
               include : {
                    model : Comment,
                    as : 'comments'
               }
          });

          
          return {posts};

     }
}