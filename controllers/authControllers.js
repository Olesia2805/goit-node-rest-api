import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const authRegisterControllers = async (req, res) => {};
const authLoginControllers = async (req, res) => {};
const authLogoutControllers = async (req, res) => {};

export default {
  authRegisterControllers: ctrlWrapper(authRegisterControllers),
  authLoginControllers: ctrlWrapper(authLoginControllers),
  authLogoutControllers: ctrlWrapper(authLogoutControllers),
};
