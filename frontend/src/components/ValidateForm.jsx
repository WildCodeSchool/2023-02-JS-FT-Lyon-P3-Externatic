import Joi from "joi";

export const ValidateForm = Joi.object({
  firstname: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 1 charcter",
      "any.required": "Name is required",
    })
    .required(),
  lastname: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 1 charcter",
      "any.required": "Last name is required",
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .messages({
      "string.empty": "Phone must be a valid phone number",
      "string.min": "Phone must be a valid phone number",
      "any.required": "Phone is required",
    })
    .required(),
  city: Joi.string()
    .min(1)
    .messages({
      "string.empty": "City name is required",
      "string.min": "City name must be at least 1 charcter",
      "any.required": "City name is required",
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email Must be a valid email",
      "any.required": "Email Must be a valid email",
    })
    .required(),
  password: Joi.string()
    .min(6)
    .max(20)
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must not exceed 20 characters",
      "any.required": "Password is required",
    })
    .required(),
});

export default { ValidateForm };
