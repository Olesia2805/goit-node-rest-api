import Joi from "joi";
import {
  emailValidationMessage,
  emailNotEmptyMessage,
  emailIsRequiredMessage,
  passwordEmptyMessage,
  passwordIsRequiredMessage,
  subscriptionOptions,
} from "../constants/messages.js";

export const authRegisterSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": emailValidationMessage,
    "string.empty": emailNotEmptyMessage,
    "string.required": emailIsRequiredMessage,
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must be at most 100 characters long",
    "string.empty": passwordEmptyMessage,
    "string.required": passwordIsRequiredMessage,
  }),
  subscription: Joi.string()
    .valid(...subscriptionOptions)
    .default("starter"),
  token: Joi.string().optional(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": emailValidationMessage,
    "string.empty": emailNotEmptyMessage,
    "string.required": emailIsRequiredMessage,
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must be at most 100 characters long",
    "string.empty": passwordEmptyMessage,
    "string.required": passwordIsRequiredMessage,
  }),
});
