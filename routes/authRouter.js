import express from "express";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";

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

authRouter.get(
  "/current",
  authenticate,
  authControllers.authGetCurrentControllers
);

export default authRouter;
