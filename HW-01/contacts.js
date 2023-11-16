const path = require("path");
const fs = require("fs");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.promises.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (e) {
    console.log(e.toString());
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.find((element) => element.id === contactId);
    return contact;
  } catch (e) {
    console.log(e.toString());
  }
}
async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const updatedContacts = data.filter((element) => element.id !== contactId);
    await fs.promises.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2)
    );
  } catch (e) {
    console.log(e.toString());
  }
}
async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    const updatedContacts = [...data, newContact];
    await fs.promises.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2)
    );
  } catch (e) {
    console.log(e.toString());
  }
}

module.exports = {
  listContacts,
  removeContact,
  getContactById,
  addContact,
};
