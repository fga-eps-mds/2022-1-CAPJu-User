import Joi from "joi";
import { ROLE } from "../schemas/role.js";

export const UserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const UserEditRoleValidator = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().allow(null, ""),
  email: Joi.string().allow(null, ""),
  role: Joi.number()
    .required()
    .allow(ROLE.DIRETOR, ROLE.JUIZ, ROLE.SERVIDOR, ROLE.ESTAGIARIO),
  deleted: Joi.bool().allow(null),
  updatedAt: Joi.string().allow(null, ""),
});
