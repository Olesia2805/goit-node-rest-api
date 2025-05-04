import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";
import {
  conflictExistsEmailMessageInUse,
  logOutSuccessfully,
} from "../constants/messages.js";
import authenticate from "../middlewares/authenticate.js";

const authRegisterControllers = async (req, res) => {
  const newUser = await authServices.registerUser(req.body, req.file);

  if (!newUser) {
    throw HttpError(409, conflictExistsEmailMessageInUse);
  }
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
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

export default {
  authRegisterControllers: ctrlWrapper(authRegisterControllers),
  authLoginControllers: ctrlWrapper(authLoginControllers),
  authLogoutControllers: ctrlWrapper(authLogoutControllers),
  authGetCurrentControllers: ctrlWrapper(authGetCurrentControllers),
  updateStatusContactControllers: ctrlWrapper(updateStatusContactControllers),
};
