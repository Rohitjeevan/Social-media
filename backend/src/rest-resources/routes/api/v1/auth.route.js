import express from "express";
import { AuthController } from "../../../controllers/auth.controller.js";
import { responseValidationMiddleware } from "../../../middlewares/responseValidation.middleware.js";
import { requestValidationMiddleware } from "../../../middlewares/requestValidation.middleware.js";
import { loginValidation, logoutValidation } from "../../../validations/auth.validation.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";

const authRoutes = express.Router();


authRoutes
   .route('/login')
   .post(
    AuthController.login,
    responseValidationMiddleware(loginValidation));

authRoutes
   .route('/logout')
   .get(
      authMiddleware,
      requestValidationMiddleware(logoutValidation),
      AuthController.logout,
      responseValidationMiddleware(logoutValidation)
   );



export default authRoutes;
