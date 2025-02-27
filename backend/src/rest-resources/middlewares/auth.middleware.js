import models from '../../db/models/index.js';
import {decodeToken} from '../../helpers/jwt.helpers.js';
import { UnauthorizedError,InvalidTokenErrorType } from '../../errors/unauthorized.error.js';
import { Logger } from '../../libs/logger.js';

export async function authMiddleware(req,res,next) {
      
    const {User } = models;
   
    if (!req.headers.authorization){
        return res.status(400).json({
            success:false,
            message: 'UnauthorizedError',
            description : 'You are not authorized '
         })
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
          const payload = await decodeToken(token);
          
          if(!payload.user)  throw new Error('UnauthorizedError');
        
          const authUser = await User.findByPk(payload.user.id);

         if(!authUser) throw new Error('UnauthorizedError');

        req.authUser = authUser;
        
        next();  

    } catch(error){
        // if (error instanceof TokenExpiredError) {
        //     return next(new UnauthorizedError());
        //   }
      
          Logger.error(error);
         return res.status(400).json({
            success:false,
            message: 'UnauthorizedError',
            description : 'You are not authorized '
         })
      
    }
}