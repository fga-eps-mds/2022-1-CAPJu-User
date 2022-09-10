import Joi from "joi";

export const UserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const UserEditRoleValidator = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().allow(null, ""),
  email: Joi.string().allow(null, ""),
  role: Joi.string()
    .required()
    .allow("Diretor", "Juíz", "Servidor", "Estagiário"),
  deleted: Joi.bool().allow(null),
  updatedAt: Joi.string().allow(null, ""),
});
