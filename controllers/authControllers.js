import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";
import {
  conflictExistsEmailMessageInUse,
  logOutSuccessfully,
} from "../constants/messages.js";
import authenticate from "../middlewares/authenticate.js";

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
  const { email } = req.user;
  res.json({ email });
};

export default {
  authRegisterControllers: ctrlWrapper(authRegisterControllers),
  authLoginControllers: ctrlWrapper(authLoginControllers),
  authLogoutControllers: ctrlWrapper(authLogoutControllers),
  authGetCurrentControllers: ctrlWrapper(authGetCurrentControllers),
};
