import User from "../schemas/User.js";
import { UserValidator } from "../validators/User.js";

class UserController {
  async createUser(req, res) {
    try {
      const { name } = await UserValidator.validateAsync(req.body);
      console.log(name);
      const user = await User.create({
        name,
      });

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async user(req, res) {
    try {
      const user = await User.findOne({ name: req.body.name });
      return res.status(200).json({
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

export default new UserController();
