import { generatePassword, hashPassword } from "../../helpers/bcrypt.helpers.js";
import { ServiceBase } from "../../libs/serviceBase.js";
import { EmailService } from "../email/emailService.js";

export class NewPasswordService extends ServiceBase {

  async run() {
  
    const { dbModels: { User }, } = this.context;

    const { email } = this.args;

    const user = await User.findOne( { where: { email }, } );

    if (!user)  return this.addError("UserNotFoundError");
  
    const newPassword = generatePassword();

    const encryptedPassword = await hashPassword(Buffer.from(newPassword,'base64'));
    
    user.password = encryptedPassword;

    await user.save();

    await EmailService.sendEmail( email,  "New Password For Connectify", `Password -> ${newPassword}  Reset After first login` );

    return { message: "New Password Sent Succesfully" };

  }

}
