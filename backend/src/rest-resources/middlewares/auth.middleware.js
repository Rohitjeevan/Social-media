import models from '../../db/models/index.js';
import {decodeToken} from '../../helpers/jwt.helpers.js';
import { UnauthorizedError } from '../../errors/unauthorized.error.js';


export async function authMiddleware(req,res,next) {
      
    const {User } = models;

    if(!req.headers.authorization) throw new Error('Unauthorized');
   
    const token = req.headers.authorization.split(' ')[1];

    try {
          const payload = await decodeToken(token);
          
          if(!payload.user)  throw new Error('Unauthorized');
        
          const authUser = await User.findByPk(payload.user.id);

         if(!authUser) throw new Error('Unauthorized');

        req.auth = { 
            auth_id : authUser.id
        }
        
        next();  

    } catch(error){
      
      console.log(error)
      
       next(new UnauthorizedError());
    }
}