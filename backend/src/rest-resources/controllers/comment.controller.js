import { sendResponse } from "../../helpers/response.helpers.js";
import { CreateCommentService } from "../../services/comment/createComment.service.js";

export class CommentController {

    static async create(req,res,next) {
          try {
                const { result, successful, errors } = await CreateCommentService.execute(
                  req.body,
                  {
                    ...req.context,
                  }
                );
          
                sendResponse(
                  { req, res, next },
                  { result, successful, serviceErrors: errors }
                );
              } catch (error) {
                  next(error)
              }        
    }

    static async get(req,res,next){
         
    }
}