import express from 'express';
import { requestValidationMiddleware } from '../../../middlewares/requestValidation.middleware';
import { CreateFollowValidation } from '../../../validations/follow.validation';
import { FollowController } from '../../../controllers/follow.controller';
import { responseValidationMiddleware } from '../../../middlewares/responseValidation.middleware';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const followRoutes = express.Router();

followRoutes
    .route('/create')
    .post(
        authMiddleware,
        requestValidationMiddleware(CreateFollowValidation),
        FollowController.create,
        responseValidationMiddleware(CreateFollowValidation)
    );

export default followRoutes;