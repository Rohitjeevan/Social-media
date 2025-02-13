import express from 'express';
import { PostController } from '../../../controllers/post.controller.js';
import { requestValidationMiddleware } from '../../../middlewares/requestValidation.middleware.js';
import { responseValidationMiddleware } from '../../../middlewares/responseValidation.middleware.js';
import { PostValidation,getByIdValidation,getPostValidation } from '../../../validations/post.validation.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const postRoutes = express.Router();


postRoutes
    .route('/create')
    .post(
        authMiddleware,
        requestValidationMiddleware(PostValidation),
        PostController.createPost,
        responseValidationMiddleware(PostValidation)
    )

postRoutes
    .route('/get')
    .get(
        requestValidationMiddleware(getPostValidation),
        PostController.getAllPost,
        responseValidationMiddleware(getPostValidation)
    )

postRoutes
    .route('/:id')
    .get(
       requestValidationMiddleware(getByIdValidation),
       PostController.getPostById,
       responseValidationMiddleware(getByIdValidation)      
    )

 export default  postRoutes;