import models from '../../db/models/index.js';
import {decodeToken} from '../../helpers/jwt.helpers.js';
import { UnauthorizedError } from '../../errors/unauthorized.error.js';


export async function authMiddleware(req,res,next) {
      
    const {User } = models;
    if(!req.headers.authorization) throw new Error('Unauthorized');
   
    const token = req.headers.authorization.split(' ')[1];

    try {
          const payload = await decodeToken(token);
          
          if(!payload.id)  throw new Error('Unauthorized');
        
          const authUser = await User.findOne({
             where : {id : payload.id}
          });

        if(!authUser) throw new Error('Unauthorized');
        next();  
    } catch(error){
      console.log(error)
      
       next(new UnauthorizedError());
    }
}