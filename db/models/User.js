import { DataTypes } from "sequelize";
import sequelize from "../Sequelize.js";
import {
  emailValidationMessage,
  emailIsRequiredMessage,
  passwordIsRequiredMessage,
  subscriptionOptions,
} from "../../constants/messages.js";

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
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatarURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// User.sync({ force: true });

export default User;
