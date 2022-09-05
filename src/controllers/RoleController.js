import Role from "../schemas/Role.js";
import { RoleValidator } from "../validators/Role.js";

class RoleController {
  async createRole(req, res) {
    try {
      const name = await RoleValidator.validateAsync(req.body);
      const permissions = await req.body.permissions;
      const RoleAlreadyExist = await Role.findOne({ name });
      if (RoleAlreadyExist) {
        return res.status(400).json({ message: "Role já existe!" });
      }
      const role = await Role.create({
        name,
        permissions,
        deleted: false,
      });
      if (role) {
        return res.status(200).json({
          name: role.name,
          permissions: role.permissions,
        });
      } else {
        return res.status(400);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async allRoles(req, res) {
    try {
      const Roles = await Role.find({ deleted: false });
      return res.status(200).json({
        Roles,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async deleteRole(req, res) {
    try {
      const RoleId = req.body.RoleId;
      const role = await Role.findOne({ _id: RoleId });

      if (!role) {
        return res.status(404).json({
          message: "Role not found",
        });
      }

      const result = await Role.updateOne(
        { _id: role._id },
        { deleted: true },
        { upsert: true }
      );

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  async editRole(req, res) {
    try {
      const body = await await RoleValidator.validateAsync(req.body);

      const result = await Role.updateOne({ _id: body._id }, body);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}
export default new RoleController();
