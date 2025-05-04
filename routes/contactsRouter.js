import express from "express";
import upload from "../middlewares/upload.js";
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
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

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
