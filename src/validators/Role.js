import Joi from "joi";

export const RoleValidator = Joi.object({
  name: Joi.string().required(),
});
