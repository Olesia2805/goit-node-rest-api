import Contact from "../db/models/Contact.js";

export const listContacts = async (ownerId, favorite) => {
  if (favorite !== undefined) {
    if (favorite === "true") {
      favorite = true;
    } else if (favorite === "false") {
      favorite = false;
    } else {
      favorite = undefined;
    }
  }

  const contacts = await Contact.findAll({
    where: {
      owner: ownerId,
      ...(favorite !== undefined && { favorite: favorite }),
    },
  });

  if (!contacts) return null;
  return contacts;
};

export const getContactById = async (contactId, ownerId) => {
  if (!ownerId || !contactId) return null;

  const contact = await Contact.findOne({
    where: {
      id: contactId,
      owner: ownerId,
    },
  });
  if (!contact) return null;

  return contact;
};

export const removeContact = async (contactId, ownerId) => {
  if (!ownerId || !contactId) return null;

  const contact = await getContactById(contactId, ownerId);
  if (!contact) return null;

  await contact.destroy();

  return contact;
};

export const addContact = async (name, email, phone, ownerId) => {
  if (!ownerId) return null;

  if (!name || !email || !phone) {
    return null;
  }

  return await Contact.create({ name, email, phone, owner: ownerId });
};

export const updateContact = async (contactId, name, email, phone, ownerId) => {
  if (!ownerId || !contactId) return null;

  const contact = await getContactById(contactId, ownerId);
  if (!contact) return null;

  const updatedContact = await contact.update({
    ...(name && { name }),
    ...(email && { email }),
    ...(phone && { phone }),
  });

  return updatedContact;
};

export const updateStatusContact = async (contactId, body, ownerId) => {
  if (!ownerId || !contactId) return null;

  const contact = await getContactById(contactId, ownerId);
  if (!contact) return null;
  const updatedContact = await contact.update({ favorite: body.favorite });

  return updatedContact;
};
