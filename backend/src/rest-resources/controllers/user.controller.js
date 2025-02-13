import { sendResponse } from "../../helpers/response.helpers.js";
import { CreateUserService } from "../../services/user/createUser.service.js";

export class UserController {
  static async createUser(req, res, next) {
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
      return res.json({
        success: false,
        message: error.message,
      });
    }
    
  }

  static async getUsers(req, res) {
    const {
      dbModels: { User, Profile },
    } = req.context;
    try {
      const users = await User.findAll({
        include: {
          model: Profile,
          as: "profiles",
        },
      });

      return res.json({
        success: true,
        message: "User retrived successfully",
        result: users,
      });
    } catch (error) {
      next(error);
    }
  }
}
