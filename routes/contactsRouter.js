import express from "express";
import {
  getAllContactsControllers,
  getOneContactControllers,
  deleteContactControllers,
  createContactControllers,
  updateContactControllers,
  updateStatusContactControllers,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
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

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateStatusContactSchema),
  updateStatusContactControllers
);

export default contactsRouter;
