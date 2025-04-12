import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContactsControllers = async (req, res, next) => {
  try {
    const data = await contactsService.listContacts();
    if (!data) {
      throw HttpError(404, "No contacts found");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getOneContactControllers = async (req, res, next) => {
  try {
    if (!data) {
      throw HttpError(404, "Contact not found");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteContactControllers = async (req, res, next) => {
  try {
    if (!data) {
      throw HttpError(404, "Contact not found");
    }
  } catch (error) {
    next(error);
  }
};

export const createContactControllers = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const updateContactControllers = async (req, res, next) => {
  try {
    if (!data) {
      throw HttpError(404, "Contact not found");
    }
  } catch (error) {
    next(error);
  }
};
