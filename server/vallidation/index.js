import Joi from "joi";

const signupSchema = Joi.object({
  username: Joi.string().min(5).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const validatePrice = (price) => {
  const schema = Joi.string().pattern(/^\d+(\.\d{1,2})?$/);
  return schema.validate(price);
};

const addItem = () => {
  const schema = Joi.string();
};

export { signupSchema, loginSchema, validatePrice };
