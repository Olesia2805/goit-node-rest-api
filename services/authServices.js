import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { conflictExistsEmailMessageInUse } from "../constants/messages.js";

export const registerUser = async (userData) => {
  const { email, password } = userData;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw HttpError(409, conflictExistsEmailMessageInUse);
  }
  const newUser = await User.create(userData);
  return newUser;
};
export const loginUser = async (userData) => {};
export const logoutUser = async (userId) => {};
