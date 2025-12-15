import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return {
      payload,
      error: null,
    };
  } catch (error) {
    return {
      payload: null,
      error,
    };
  }
};
