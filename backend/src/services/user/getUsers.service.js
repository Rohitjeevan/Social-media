import { ServiceBase } from "../../libs/serviceBase.js";

export class GetUsersService extends ServiceBase {
  async run() {
    const {
      dbModels: { User },
    } = this.context;

    const users = await User.findAll();
    return { users };
  }
}
