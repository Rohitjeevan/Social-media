import { ServiceBase } from "../../libs/serviceBase.js";

export class CreatePostService extends ServiceBase {
  async run() {
    const {
      dbModels: { Post },
    } = this.context;
    const { description,location, image_url,dataValues } = this.args;

    

    const newPost = await Post.create({
        description : description,
        location : location,
        image_url : image_url,
        userId : dataValues.id
    })  

    return {message : "Post succesfully created "}
  }
}
