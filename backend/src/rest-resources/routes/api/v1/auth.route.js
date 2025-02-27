import express from "express";
import { AuthController } from "../../../controllers/auth.controller.js";
import { responseValidationMiddleware } from "../../../middlewares/responseValidation.middleware.js";
import { requestValidationMiddleware } from "../../../middlewares/requestValidation.middleware.js";
import { loginValidation, logoutValidation, newPasswordValidation, resetPasswordValidation } from "../../../validations/auth.validation.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";

const authRoutes = express.Router();


authRoutes
   .route('/login')
   .post(
      requestValidationMiddleware(loginValidation),
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

authRoutes
   .route('/forget-password')
   .post(
      requestValidationMiddleware(newPasswordValidation),
      AuthController.newPassword,
      responseValidationMiddleware(newPasswordValidation)
   )

authRoutes
    .route('/reset-password')
    .post(
      authMiddleware,
      requestValidationMiddleware(resetPasswordValidation),
      AuthController.resetPassword,
      responseValidationMiddleware(resetPasswordValidation)
    )
    

export default authRoutes;
