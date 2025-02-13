import express from 'express';
import { UserController } from '../../../controllers/user.controller.js';
import { responseValidationMiddleware } from '../../../middlewares/responseValidation.middleware.js';

const router = express.Router();


router.get('/getusers',UserController.getUsers);
router.post('/createuser',UserController.createUser,responseValidationMiddleware());


export default router;