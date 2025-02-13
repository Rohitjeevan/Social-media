import { ServiceBase } from "../../libs/serviceBase.js";

export class CreateCommentService extends ServiceBase {
  async run() { 
        const {
            dbModels: {Comment},
        } = this.context;
           const { description,postId,userId} = this.args;
        
           const newComment = await Comment.create({
                description : description,
                 postId : postId,
                 userId : userId
           })
      
           return { message : "Comment Succesfully Created "}
  }
}
