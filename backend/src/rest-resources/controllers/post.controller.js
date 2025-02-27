import { sendResponse } from "../../helpers/response.helpers.js";
import { CreatePostService } from "../../services/post/createPost.service.js";
import { GetPostService } from "../../services/post/getPost.service.js";
import { GetPostByIdService } from "../../services/post/getPostById.service.js";

export class PostController {
  
  static async createPost(req,res,next) {
    try {
      const { result, successful, errors } = await CreatePostService.execute(
        {...req.body,...req.authUser},
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

  static async getAllPost(req,res,next) {
         try {
            const {result ,successful,errors} = await GetPostService.execute(
              req.body,
              {
                ...req.context
              }
            );
            
            sendResponse({req,res,next},{result,successful,serviceErrors:errors});
         } catch (error){
             next(error);
         }
  }

static async getPostById(req,res,next) {
       try {
           const {result,successful,errors}  = await GetPostByIdService.execute(
            req.params,
            {
              ...req.context
            }
           );

           sendResponse({req,res,next},{result,successful,serviceErrors:errors});
       } catch(error){
            next(error);
       }
  }

  static async like(req,res,next){
        
  }
}
