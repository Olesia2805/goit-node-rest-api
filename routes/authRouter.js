import express from "express";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import {
  authRegisterSchema,
  authLoginSchema,
  updateSubscriptionContactSchema,
} from "../schemas/authSchemas.js";
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

authRouter.post("/logout", authenticate, authControllers.authLogoutControllers);

authRouter.get(
  "/current",
  authenticate,
  authControllers.authGetCurrentControllers
);

authRouter.patch(
  "/subscription",
  validateBody(updateSubscriptionContactSchema),
  authenticate,
  authControllers.updateStatusContactControllers
);

export default authRouter;
