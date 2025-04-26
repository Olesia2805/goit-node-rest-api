import bcrypt from "bcrypt";

import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import {
  conflictExistsEmailMessageInUse,
  loginInvalidMessage,
  notFoundMessage,
  userByEmailNotFoundMessage,
} from "../constants/messages.js";
import { generateToken } from "../helpers/jwt.js";

export const findUser = (query) => {
  return User.findOne({ where: query });
};

export const registerUser = async (userData) => {
  const { email, password } = userData;
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw HttpError(409, conflictExistsEmailMessageInUse);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...userData, password: hashedPassword });
  return newUser;
};

export const loginUser = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw HttpError(401, loginInvalidMessage);
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw HttpError(401, loginInvalidMessage);
  }

  const payload = { email: user.email };

  const token = generateToken(payload);

  await user.update({ token });

  return { token };
};

export const logoutUser = async (userId) => {
  const user = await findUser(userId);
  console.log(user);
  if (!user || !user.token) {
    throw HttpError(401, notFoundMessage);
  }

  await user.update({ token: null });
};
