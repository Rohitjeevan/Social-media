import { checkPassword } from "../../helpers/bcrypt.helpers.js";
import { createToken } from "../../helpers/jwt.helpers.js";
import { ServiceBase } from "../../libs/serviceBase.js";

export class LoginService extends ServiceBase {
   async run(){
         const {dbModels:{ User } } = this.context;
         const { email, password } = this.args;
           
         const user = await User.findOne( {where:{email}});
         
         if(!user){
            return this.addError('InvalidCredentialErrorType');
         }
        
         const isPasswordValid = await checkPassword(Buffer.from(password,'base64'),user.password);

         if(!isPasswordValid){
            return this.addError('InvalidCredentialErrorType');
         }

         const token = await createToken(user);

         user.dataValues.password = undefined;
             
         return {user,token};

   }   
}