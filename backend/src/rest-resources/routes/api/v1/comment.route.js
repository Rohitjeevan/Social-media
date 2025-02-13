import express from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";
import { requestValidationMiddleware } from "../../../middlewares/requestValidation.middleware.js";
import {CreateCommentValidation} from "../../../validations/comment.validation.js"
import { CommentController } from "../../../controllers/comment.controller.js";
import { responseValidationMiddleware } from "../../../middlewares/responseValidation.middleware.js";
const commentRoutes =  express.Router();


commentRoutes
      .route('/create')
      .post(
          authMiddleware,
          requestValidationMiddleware(CreateCommentValidation),
          CommentController.create,
          responseValidationMiddleware(CreateCommentValidation)
      ) 

 export default commentRoutes;