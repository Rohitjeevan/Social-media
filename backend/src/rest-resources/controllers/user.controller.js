import { sendResponse } from "../../helpers/response.helpers.js";
import { CreateUserService } from "../../services/user/createUser.service.js";
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
}
