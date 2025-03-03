
import { ServiceBase } from "../../libs/serviceBase";

export class CreateFollowService extends ServiceBase {
  async run() {
    const {
      dbModels: { Follow, User },
    } = this.context;

    const { follower_id, dataValues: authUser } = this.args;

    if (follower_id === authUser.id)  return this.addError("UserItSelfNotFollowed");

    if (!(await User.findByPk(follower_id)))  return this.addError("UserNotFoundError");

    const [follow, created] = await Follow.findOrCreate({
      where: { following_id: authUser.id, follower_id: follower_id },
      defaults: { following_id: authUser.id, follower_id },
    });

    if (!created) return this.addError("AlreadyFollowedError");

    return { message: "User followed succesfulyy." };
  }
}
