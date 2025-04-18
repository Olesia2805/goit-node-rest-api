import Joi from "joi";
import {
  phoneRegex,
  phoneValidationMessage,
  emailValidationMessage,
  emailNotEmptyMessage,
  phoneNotEmptyMessage,
} from "../constants/contacts.js";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 50 characters long",
  }),
  email: Joi.string().email().required().messages({
    "string.email": emailValidationMessage,
    "string.empty": emailNotEmptyMessage,
  }),
  phone: Joi.string().pattern(phoneRegex).required().messages({
    "string.pattern.base": phoneValidationMessage,
    "string.empty": phoneNotEmptyMessage,
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 50 characters long",
  }),
  email: Joi.string().email().required().messages({
    "string.email": emailValidationMessage,
    "string.empty": emailNotEmptyMessage,
  }),
  phone: Joi.string().pattern(phoneRegex).required().messages({
    "string.pattern.base": phoneValidationMessage,
    "string.empty": phoneNotEmptyMessage,
  }),
});

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
