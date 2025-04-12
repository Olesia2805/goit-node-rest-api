import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContactsData = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  try {
    const allContacts = await fs.readFile(contactsPath, "utf-8");

    const parsed = JSON.parse(allContacts);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return null;
  }
}

async function getContactById(contactId) {
  const allContacts = await listContacts();

  const contact = allContacts.find((item) => item.id === contactId);

  return contact || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [removedContact] = allContacts.splice(index, 1);

  await updateContactsData(allContacts);

  return removedContact;
}

async function addContact(name, email, phone) {
  if (!name || !email || !phone) {
    return null;
  }

  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  allContacts.push(newContact);

  await updateContactsData(allContacts);

  return newContact;
}

export default { listContacts, getContactById, removeContact, addContact };
