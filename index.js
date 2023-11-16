// import {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// } from "./contacts.js";
import { listContacts } from "./controllers/contacts/indexContacts.js";
import { getContactById } from "./controllers/contacts/showContacts.js";
import { addContact } from "./controllers/contacts/createContacts.js";
import { removeContact } from "./controllers/contacts/deleteContacts.js";

import { Command } from "commander";
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then((contacts) => console.table(contacts));
      break;

    case "get":
      getContactById(id).then((contact) => console.table(contact));
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
