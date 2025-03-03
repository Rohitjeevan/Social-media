import { sendResponse } from "../../helpers/response.helpers";
import { CreateFollowService } from "../../services/follow/createFollow.service";

export class FollowController {
  static async create(req, res, next) {
    try {
      const { result, successful, errors } = await CreateFollowService.execute(
        { ...req.body, ...req.authUser },
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
}
