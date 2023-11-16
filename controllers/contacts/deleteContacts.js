import { listContacts } from "./indexContacts.js";
import fs from "fs";

export async function removeContact(contactId) {
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
