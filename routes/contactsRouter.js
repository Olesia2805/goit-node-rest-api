import express from "express";
import {
  getAllContactsControllers,
  getOneContactControllers,
  deleteContactControllers,
  createContactControllers,
  updateContactControllers,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContactsControllers);

contactsRouter.get("/:id", getOneContactControllers);

contactsRouter.delete("/:id", deleteContactControllers);

contactsRouter.post("/", createContactControllers);

contactsRouter.put("/:id", updateContactControllers);

export default contactsRouter;
