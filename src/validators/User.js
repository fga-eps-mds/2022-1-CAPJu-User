import Joi from "joi";
import { ROLE } from "../schemas/role.js";

export const UserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.number()
    .required()
    .valid(...Object.values(ROLE)),
});

export const UserEditRoleValidator = Joi.object({
  _id: Joi.string().required(),
  role: Joi.number()
    .required()
    .valid(...Object.values(ROLE)),
});
