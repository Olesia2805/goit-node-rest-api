import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/authServices.js";
import { verifyToken } from "../helpers/jwt.js";

import { notAuthorizedMessage } from "../constants/messages.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, notAuthorizedMessage));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, notAuthorizedMessage));
  }
  const { payload, error } = verifyToken(token);
  if (error) {
    return next(HttpError(401, notAuthorizedMessage));
  }
  const user = await findUser({ email: payload.email });
  if (!user || !user.token) {
    return next(HttpError(401, notAuthorizedMessage));
  }
  req.user = user;
  next();
};

export default authenticate;
