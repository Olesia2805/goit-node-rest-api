import gravatar from "gravatar";
import fs from "node:fs/promises";
import path from "node:path";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";
import {
  conflictExistsEmailMessageInUse,
  logOutSuccessfully,
} from "../constants/messages.js";

const posterDir = path.resolve("public", "avatars");

const authRegisterControllers = async (req, res) => {
  const { file } = req;
  const { email } = req.body;

  const avatarURL = file
    ? (() => {
        const newPath = path.join(posterDir, file.filename);
        fs.rename(file.path, newPath);
        return path.join("avatars", file.filename);
      })()
    : gravatar.url(email, { s: "250", d: "identicon" }, true);

  const newUser = await authServices.registerUser({ ...req.body, avatarURL });

  if (!newUser) {
    throw HttpError(409, conflictExistsEmailMessageInUse);
  }

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  });
};

const authResendVerifyEmailControllers = async (req, res) => {
  const { email } = req.body;
  const user = await authServices.resendVerifyEmailUser(email);

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const { verificationToken } = user;

  await authServices.sendEmail({
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  });

  res.status(200).json({
    message: "Verification email sent",
  });
};

const authVerifyEmailControllers = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await authServices.verifyEmailUser(verificationToken);

  if (!user) {
    throw HttpError(404, "User not found");
  }

  res.status(200).json({
    message: "Verification successful",
  });
};

const authLoginControllers = async (req, res) => {
  const user = await authServices.loginUser(req.body);
  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const authLogoutControllers = async (req, res) => {
  const { id } = req.user;
  await authServices.logoutUser(id);
  res.sendStatus(204);
};

const authGetCurrentControllers = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateStatusContactControllers = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

  await authServices.updateSubscriptionUser(id, subscription);
  res.json({ subscription });
};

const updateAvatarControllers = async (req, res) => {
  const { id } = req.user;

  if (!req.file) {
    throw HttpError(400, "Avatar file is required");
  }

  const { path: tempUpload, filename } = req.file;
  const avatarURL = path.join("avatars", filename);
  const newPath = path.join(posterDir, filename);

  await fs.rename(tempUpload, newPath);

  await authServices.updateAvatarUser(id, avatarURL);
  res.json({ avatarURL });
};

export default {
  authRegisterControllers: ctrlWrapper(authRegisterControllers),
  authVerifyEmailControllers: ctrlWrapper(authVerifyEmailControllers),
  authResendVerifyEmailControllers: ctrlWrapper(
    authResendVerifyEmailControllers
  ),
  authLoginControllers: ctrlWrapper(authLoginControllers),
  authLogoutControllers: ctrlWrapper(authLogoutControllers),
  authGetCurrentControllers: ctrlWrapper(authGetCurrentControllers),
  updateStatusContactControllers: ctrlWrapper(updateStatusContactControllers),
  updateAvatarControllers: ctrlWrapper(updateAvatarControllers),
};
