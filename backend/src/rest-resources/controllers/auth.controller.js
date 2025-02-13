import { sendResponse } from "../../helpers/response.helpers.js";
import { LoginService } from "../../services/auth/login.service.js ";
import { LogoutService } from "../../services/auth/logout.service.js";

export class AuthController {
    static async login(req,res,next) {
          try {
               const {result,successful,errors  } = await LoginService.execute(req.body,{ ...req.context});
               sendResponse({req,res,next},{result,successful,serviceErrors:errors});
          }
          catch(error){
            next(error);
          }
    }
        
    static async logout(req,res,next) {
          try {
                const {result,successful,errors} = await LogoutService.execute(req.body,{
                  ...req.context
                });
                
                sendResponse({req,res,next},{result,successful,serviceErrors:errors});
                
          } catch (error){
              next(error);
          }
    }

}