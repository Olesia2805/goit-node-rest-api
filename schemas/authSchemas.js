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
    "any.required": emailIsRequiredMessage,
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must be at most 30 characters long",
    "string.empty": passwordEmptyMessage,
    "any.required": passwordIsRequiredMessage,
  }),
  subscription: Joi.string()
    .valid(...subscriptionOptions)
    .default("starter")
    .messages({
      "any.only": `Subscription must be one of the following: ${subscriptionOptions.join(
        ", "
      )}`,
    }),
});

export const authVerifyEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": emailValidationMessage,
    "string.empty": emailNotEmptyMessage,
    "any.required": emailIsRequiredMessage,
  }),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": emailValidationMessage,
    "string.empty": emailNotEmptyMessage,
    "any.required": emailIsRequiredMessage,
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must be at most 30 characters long",
    "string.empty": passwordEmptyMessage,
    "any.required": passwordIsRequiredMessage,
  }),
});

export const updateSubscriptionContactSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionOptions)
    .messages({
      "any.only": `Subscription must be one of the following: ${subscriptionOptions.join(
        ", "
      )}`,
    }),
});
