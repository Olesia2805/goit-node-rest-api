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
  const { email, password, avatarURL } = userData;
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw HttpError(409, conflictExistsEmailMessageInUse);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
    avatarURL,
  });

  return newUser;
};

export const resendVerifyEmailUser = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw HttpError(404, userByEmailNotFoundMessage);
  }

  return user;
};

export const verifyEmailUser = async (verificationToken) => {
  const user = await User.findOne({ where: { verificationToken } });

  if (!user) {
    throw HttpError(404, userByEmailNotFoundMessage);
  }

  await user.update({
    verify: true,
    verificationToken: null,
  });

  return user;
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

  return user;
};

export const logoutUser = async (userId) => {
  const user = await findUser(userId);
  if (!user || !user.token) {
    throw HttpError(401, notAuthorizedMessage);
  }

  await user.update({ token: null });
};

export const updateSubscriptionUser = async (userId, subscriptionName) => {
  if (!subscriptionName || !userId) return null;

  const user = await User.findByPk(userId);
  if (!user) {
    throw HttpError(404, notFoundMessage);
  }

  await user.update({ subscription: subscriptionName });
  return user;
};

export const updateAvatarUser = async (userId, avatarURL) => {
  if (!avatarURL || !userId) return null;

  const user = await User.findByPk(userId);
  if (!user) {
    throw HttpError(404, notFoundMessage);
  }

  await user.update({ avatarURL });
  return user;
};
