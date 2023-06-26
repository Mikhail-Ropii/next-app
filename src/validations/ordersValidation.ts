import Joi from "joi";

const cart = Joi.object({
  shop: Joi.string().required(),
  _id: Joi.string().required(),
  name: Joi.string().required(),
  img: Joi.string().required(),
  qty: Joi.number().required(),
  price: Joi.number().required(),
  totalPrice: Joi.number().required(),
});

export const ordersSchema = Joi.object({
  cart: Joi.array().items(cart).required(),
  sum: Joi.number().required(),
  userData: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
  }).required(),
});
