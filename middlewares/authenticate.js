import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/authServices.js";
import { verifyToken } from "../helpers/jwt.js";

import {
  headerMissingMessage,
  bearerMissingMessage,
  userByEmailNotFoundMessage,
} from "../constants/messages.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, headerMissingMessage));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, bearerMissingMessage));
  }
  const { payload, error } = verifyToken(token);
  if (error) {
    return next(HttpError(401, error.message));
  }
  const user = await findUser({ email: payload.email });
  if (!user) {
    return next(HttpError(401, userByEmailNotFoundMessage));
  }
  req.user = user;
  next();
};

export default authenticate;
