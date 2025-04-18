import express from "express";
import {
  getAllContactsControllers,
  getOneContactControllers,
  deleteContactControllers,
  createContactControllers,
  updateContactControllers,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContactsControllers);

contactsRouter.get("/:id", getOneContactControllers);

contactsRouter.delete("/:id", deleteContactControllers);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  createContactControllers
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  updateContactControllers
);

export default contactsRouter;
