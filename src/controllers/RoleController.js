import Role from "../schemas/Role.js";
import { RoleValidator } from "../validators/Role.js";

class RoleController {
  async createRole(req, res) {
    try {
      const name = await RoleValidator.validateAsync(req.body);
      const RoleAlreadyExist = await Role.findOne({ name });
      if (RoleAlreadyExist) {
        return res.status(400).json({ message: "Role já existe!" });
      }
      const role = await Role.create({
        name,
      });
      if (role) {
        return res.status(200).json({ name: role.name });
      } else {
        return res.status(400);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}
export default new RoleController();
