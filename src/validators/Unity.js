import Joi from "joi";

export const unityAdmin = Joi.object({
  unityId: Joi.string().required(),
  userId: Joi.string().required(),
});

export const removeAdmin = Joi.object({
  unityId: Joi.string().required(),
  adminId: Joi.string().required(),
});
