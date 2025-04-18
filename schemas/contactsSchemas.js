import Joi from "joi";
import {
  phoneRegex,
  phoneValidationMessage,
  emailValidationMessage,
} from "../constants/contacts.js";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 50 characters long",
  }),
  email: Joi.string().email().message(emailValidationMessage).required(),
  phone: Joi.string()
    .pattern(phoneRegex)
    .message(phoneValidationMessage)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 50 characters long",
  }),
  email: Joi.string().email().message(emailValidationMessage).required(),
  phone: Joi.string()
    .pattern(phoneRegex)
    .message(phoneValidationMessage)
    .required(),
});

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
