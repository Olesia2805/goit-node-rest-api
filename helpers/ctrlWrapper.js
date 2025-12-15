import { ValidationError } from "sequelize";

const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400);
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409);
      }
      next(error);
    }
  };
};

export default ctrlWrapper;
