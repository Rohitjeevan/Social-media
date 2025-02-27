import { ServiceBase } from "../../libs/serviceBase.js";

export class CreateCommentService extends ServiceBase {
  async run() {
    const {
      dbModels: { Comment,Post },
    } = this.context;
    const { description, post_id, dataValues: authUser } = this.args;
          
     const post = await Post.findByPk(post_id);
     
     if(!post) return this.addError("PostDoesNotExits");
     
     await Comment.create({
      description: description,
      postId: post_id,
      userId: authUser.id,
    });

    return { message: "Comment Succesfully Created " };
  }
}
