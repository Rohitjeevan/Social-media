import { ServiceBase } from "../../libs/serviceBase.js";

export class CreatePostService extends ServiceBase {
  async run() {
    const {
      dbModels: { Post },
    } = this.context;
    const { description,location, image_url, like, comment, userId } = this.args;

    const newPost = await Post.create({
        description : description,
        location : location,
        image_url : image_url,
        like : like,
        comment : comment,
        userId : userId
    })  

    return {message : "Post succesfully created "}
  }
}
