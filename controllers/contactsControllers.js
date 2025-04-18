import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

export const getAllContactsControllers = ctrlWrapper(async (req, res) => {
  const data = await contactsService.listContacts();
  if (!data) {
    throw HttpError(404, "Contacts not found");
  }
  res.json(data);
});

export const getOneContactControllers = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.getContactById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
});

export const deleteContactControllers = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.removeContact(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
});

export const createContactControllers = ctrlWrapper(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    throw HttpError(400, "missing required name field");
  }
  const data = await contactsService.addContact(name, email, phone);
  if (!data) {
    throw HttpError(409, "Email in use");
  }
  res.status(201).json(data);
});

export const updateContactControllers = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    throw HttpError(400, "Body must have at least one field");
  }
  const data = await contactsService.updateContact(id, name, email, phone);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
});

export const updateStatusContactControllers = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined) {
    throw HttpError(400, "missing field favorite");
  }
  const data = await contactsService.updateStatusContact(id, { favorite });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
});
