import { NotFoundError } from "../../errors/notFound.error.js";
import { ServiceBase } from "../../libs/serviceBase.js";

export class GetPostByIdService extends ServiceBase {
  async run() {
    const {
      dbModels: { Post },
    } = this.context;

    const { id } = this.args;
    
    const post = await Post.findByPk(id);

    if(!post){
        throw new NotFoundError('post')
    }
    return { post };
  }
}
