import Joi from "joi";

export const UserValidator = Joi.object({
  name: Joi.string().required(),
});
