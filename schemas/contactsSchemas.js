import Joi from "joi";
import {
  nameNotEmptyMessage,
  nameIsRequiredMessage,
  phoneRegex,
  phoneValidationMessage,
  phoneNotEmptyMessage,
  phoneIsRequiredMessage,
  emailValidationMessage,
  emailNotEmptyMessage,
  emailIsRequiredMessage,
  favoriteValidationMessage,
  favoriteIsRequiredMessage,
} from "../constants/contacts.js";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 50 characters long",
    "string.empty": nameNotEmptyMessage,
    "string.required": nameIsRequiredMessage,
  }),
  email: Joi.string().email().required().messages({
    "string.email": emailValidationMessage,
    "string.empty": emailNotEmptyMessage,
    "string.required": emailIsRequiredMessage,
  }),
  phone: Joi.string().pattern(phoneRegex).required().messages({
    "string.pattern.base": phoneValidationMessage,
    "string.empty": phoneNotEmptyMessage,
    "string.required": phoneIsRequiredMessage,
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 50 characters long",
    "string.empty": nameNotEmptyMessage,
    "string.required": nameIsRequiredMessage,
  }),
  email: Joi.string().email().required().messages({
    "string.email": emailValidationMessage,
    "string.empty": emailNotEmptyMessage,
    "string.required": emailIsRequiredMessage,
  }),
  phone: Joi.string().pattern(phoneRegex).required().messages({
    "string.pattern.base": phoneValidationMessage,
    "string.empty": phoneNotEmptyMessage,
    "string.required": phoneIsRequiredMessage,
  }),
});

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "boolean.base": favoriteValidationMessage,
    "any.required": favoriteIsRequiredMessage,
  }),
});
