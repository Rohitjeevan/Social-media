import models,{sequelize} from '../../db/models/index.js';

export function contextMiddleware(){
    return async (req,res,next) => {
         const context = {
            req : req,
            sequelize :sequelize,
            dbModels : models
         };

         req.context = context;
         next();
    }
}