import express from "express";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  authControllers.authRegisterControllers
);
authRouter.post(
  "/login",
  validateBody(authLoginSchema),
  authControllers.authLoginControllers
);
authRouter.post("/logout", authControllers.authLogoutControllers);
authRouter.get("/current", async (req, res) => {});

export default authRouter;
