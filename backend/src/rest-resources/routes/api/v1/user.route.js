import express from 'express';
import { UserController } from '../../../controllers/user.controller.js';
import { responseValidationMiddleware } from '../../../middlewares/responseValidation.middleware.js';
import { requestValidationMiddleware } from '../../../middlewares/requestValidation.middleware.js';
import { createValidation, getValidation } from '../../../validations/user.validation.js';

const userRoutes = express.Router();

userRoutes
    .route('/create')
    .post(
        requestValidationMiddleware(createValidation),
        UserController.create,
        responseValidationMiddleware(createValidation)
    );
    
userRoutes
    .route('/get')
    .get(
        requestValidationMiddleware(getValidation),
        UserController.get,
        responseValidationMiddleware(getValidation)
    )

export default userRoutes;