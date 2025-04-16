import Contact from "../db/models/Contact.js";

export const listContacts = async () => {
  const contacts = await Contact.findAll();
  if (!contacts) return null;

  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;

  return contact;
};

export const removeContact = async (contactId) => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;

  await contact.destroy();

  return contact;
};

export const addContact = async (name, email, phone) => {
  if (!name || !email || !phone) {
    return null;
  }
  if (await Contact.findOne({ where: { email } })) {
    return null;
  }

  return await Contact.create({ name, email, phone });
};

export const updateContact = async (contactId, name, email, phone) => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;

  const updatedContact = await contact.update({
    ...(name && { name }),
    ...(email && { email }),
    ...(phone && { phone }),
  });

  return updatedContact;
};

export const updateStatusContact = async (contactId, body) => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  const updatedContact = await contact.update({ favorite: body.favorite });

  return updatedContact;
};
