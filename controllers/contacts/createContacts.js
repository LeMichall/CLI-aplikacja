import path from "path";
import fs from "fs";
import { nanoid } from "nanoid";
import { listContacts } from "./indexContacts.js";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

export async function addContact(name, email, phone) {
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
