import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import {
  conflictExistsEmailMessageInUse,
  loginInvalidMessage,
  notFoundMessage,
  userNotFoundOrVerifiedMessage,
} from "../constants/messages.js";
import { generateToken } from "../helpers/jwt.js";
import sendEmail from "../helpers/sendEmail.js";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

const createVerificationEmail = (email, verificationToken) => {
  return {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${APP_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  };
};

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

  const verificationToken = nanoid();

  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  if (newUser.verificationToken) {
    const emailData = createVerificationEmail(
      newUser.email,
      newUser.verificationToken
    );
    await sendEmail(emailData);
  }

  return newUser;
};

export const verifyEmailUser = async (verificationToken) => {
  const user = await findUser({ verificationToken });

  if (!user) {
    throw HttpError(404, userNotFoundOrVerifiedMessage);
  }

  await user.update({
    verify: true,
    verificationToken: null,
  });

  return user;
};

//TODO
// export const resendVerifyEmailUser = async (email) => {
//   const user = await User.findOne({ where: { email } });

//   if (!user) {
//     throw HttpError(404, userByEmailNotFoundMessage);
//   }

//   if (user.verify) {
//     throw HttpError(400, "Verification has already been passed");
//   }

//   return user;
// };

export const loginUser = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw HttpError(401, loginInvalidMessage);
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
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
