import { hashPassword } from "../../helpers/bcrypt.helpers.js";
import { ServiceBase } from "../../libs/serviceBase.js";
export class CreateUserService extends ServiceBase {
  async run() {
    const {
      dbModels: { User },
    } = this.context;

    const { name, email, password, age, city, eligible, dob, mobile, gender } = this.args;
      
    let emailExist = false;
     emailExist =  await User.findOne({  where : {email}   });
  
     if(emailExist){
       return this.addError('EmailExistsErrorType');
     }
     
    const encryptedPassword = await hashPassword(Buffer.from(password,'base64'));

    const newUser = await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
      age: age,
      city: city,
      eligible: eligible,
      dob: dob,
      mobile: mobile,
      gender: gender,
    });

    return { message: "User Successfully created" }
  }
}
