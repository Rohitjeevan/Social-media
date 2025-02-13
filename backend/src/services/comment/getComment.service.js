import { ServiceBase } from "../../libs/serviceBase";

export class GetCommentService extends ServiceBase {

      async run(){
         
        const {
            dbModels: {Comment},
        } = this.context;

        const comments = await Comment.findAll();

        return {comments};

      }
}