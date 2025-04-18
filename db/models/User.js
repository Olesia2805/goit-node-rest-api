import { DataTypes } from "sequelize";
import sequelize from "../Sequelize.js";
import {
  emailValidationMessage,
  emailIsRequiredMessage,
  passwordIsRequiredMessage,
  subscriptionOptions,
} from "../../constants/contacts.js";

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: emailValidationMessage,
      },
      notNull: {
        msg: emailIsRequiredMessage,
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 100],
        msg: "Password must be between 6 and 100 characters long",
      },
      notNull: {
        msg: passwordIsRequiredMessage,
      },
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: subscriptionOptions,
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
