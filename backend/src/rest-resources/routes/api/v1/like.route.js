import express from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";
import { CreateLikeValidation, DisLikeValidation } from "../../../validations/like.validation.js";
import { LikeController } from "../../../controllers/like.controller.js";
import { requestValidationMiddleware } from "../../../middlewares/requestValidation.middleware.js";
import { responseValidationMiddleware } from "../../../middlewares/responseValidation.middleware.js";

const likeRouter = express.Router();

likeRouter
     .route('/create')
     .post(
        authMiddleware,
        requestValidationMiddleware(CreateLikeValidation),
        LikeController.create,
        responseValidationMiddleware(CreateLikeValidation)
     );

likeRouter
     .route('/dislike')
     .post(
        authMiddleware,
        requestValidationMiddleware(DisLikeValidation),
        LikeController.delete,
        responseValidationMiddleware(DisLikeValidation)
     );



export default likeRouter;