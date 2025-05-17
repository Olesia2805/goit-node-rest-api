import express from "express";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import {
  authRegisterSchema,
  authLoginSchema,
  updateSubscriptionContactSchema,
  authVerifyEmailSchema,
} from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  validateBody(authRegisterSchema),
  authControllers.authRegisterControllers
);

authRouter.get(
  "/verify/:verificationToken",
  authControllers.authVerifyEmailControllers
);

authRouter.post(
  "/verify",
  validateBody(authVerifyEmailSchema),
  authControllers.authVerifyEmailControllers
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

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatarControllers
);

export default authRouter;
