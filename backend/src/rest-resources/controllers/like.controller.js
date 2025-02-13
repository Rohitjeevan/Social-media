import { sendResponse } from "../../helpers/response.helpers.js";
import { LikeService } from "../../services/like/likeService.js";


export class LikeController  {

    static async create(req,res,next){
         
        try {
               const { result,successful,errors} = await LikeService.execute(
                   req.body,{
                    ...req.context
                   }
               );

               sendResponse({req,res,next},{result,successful,serviceErrors:errors});
        }
        catch(error){
            next(error);
        }
    }
}