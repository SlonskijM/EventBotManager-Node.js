import { User } from "../models/models.js";

class UserService {
  async getMy() {
    return await User.findAll();
  }
}

export default new UserService();
