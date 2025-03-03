import { sendResponse } from "../../helpers/response.helpers.js";
import { CreateUserService } from "../../services/user/createUser.service.js";
import { GetUserById } from "../../services/user/getUserById.service.js";
import { GetUsersService } from "../../services/user/getUsers.service.js";

export class UserController {

  static async create(req, res, next) {
    try {
      const { result, successful, errors } = await CreateUserService.execute(
        req.body,
        {
          ...req.context,
        }
      );
      sendResponse(
        { req, res, next },
        { result, successful, serviceErrors: errors }
      );
    } catch (error) {
      next(error);
    }
  }

  // Retrive all Users 
  static async get(req, res, next) {
    try {
      const { result, successful, errors } = await GetUsersService.execute(
        req.query,
        {
        ...req.context,
      });

      sendResponse(
        { req, res, next },
        { result, successful, serviceErrors: errors }
      );
    } catch (error) {
      next(error);
    }
  }

  // Retrive Single User
  
  static async getUserById(req,res,next) {
    try {
      const { result, successful, errors } = await GetUserById.execute(
        req.params,
        {
        ...req.context,
      });

      sendResponse(
        { req, res, next },
        { result, successful, serviceErrors: errors }
      );
    } catch (error) {
      next(error);
    }
  }

}
