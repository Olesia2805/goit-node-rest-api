import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";
import { conflictExistsEmailMessageInUse } from "../constants/messages.js";

const authRegisterControllers = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);
  if (!newUser) {
    throw HttpError(409, conflictExistsEmailMessageInUse);
  }
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};
const authLoginControllers = async (req, res) => {};
const authLogoutControllers = async (req, res) => {};

export default {
  authRegisterControllers: ctrlWrapper(authRegisterControllers),
  authLoginControllers: ctrlWrapper(authLoginControllers),
  authLogoutControllers: ctrlWrapper(authLogoutControllers),
};
