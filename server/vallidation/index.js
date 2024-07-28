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

const priceschema = Joi.object({
  price: Joi.number().required(),
});

const reviewSchema = Joi.object({
  product_id: Joi.number().required(),
  review: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
});

export { signupSchema, loginSchema, priceschema, reviewSchema };
