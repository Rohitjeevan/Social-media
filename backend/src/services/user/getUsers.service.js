import { ServiceBase } from "../../libs/serviceBase.js";

export class GetUsersService extends ServiceBase {
  async run() {
    const {
      dbModels: { User,Follow},
    } = this.context;

    const users = await User.findAll({
      include: [
        {
          model : Follow,
          as : 'follower'
        },
        {
          model : Follow,
          as : 'following'
        }
      ]
    });

    return { users };
  }
}
