import { checkPassword, hashPassword } from "../../helpers/bcrypt.helpers.js";
import { ServiceBase } from "../../libs/serviceBase.js";

export class ResetPasswordService extends ServiceBase {
       
    async run (){
        
        const { dbModels:{User} } = this.context;
         
        const {old_password,new_password,auth_id} = this.args;
   
        const user = await  User.findByPk(auth_id);
        
        if(!user) return this.addError('SomethingWrong'); 

        const isPasswordValid = await checkPassword(Buffer.from(old_password,'base64'),user.password);

        if(!isPasswordValid){
            return this.addError('InvalidUserPassword');
        }
        
        const encryptedPassword = await hashPassword(Buffer.from(new_password,'base64'));
        
        user.password = encryptedPassword;

        await user.save();

        return {message : "Password Update successfully."};

    }

}