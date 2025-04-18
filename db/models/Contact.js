import { DataTypes } from "sequelize";
import sequelize from "../Sequelize.js";

import {
  phoneRegex,
  phoneValidationMessage,
  emailValidationMessage,
  nameValidationMessage,
  emailNotEmptyMessage,
  phoneNotEmptyMessage,
} from "../../constants/contacts.js";

const Contact = sequelize.define("contact", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 50],
        msg: nameValidationMessage,
      },
      notNull: {
        msg: "Name is required",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: emailValidationMessage,
      },
      notNull: {
        msg: "Email is required",
      },
      notEmpty: {
        msg: emailNotEmptyMessage,
      },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Phone is required",
      },
      notEmpty: {
        msg: phoneNotEmptyMessage,
      },
      is: {
        args: phoneRegex,
        msg: phoneValidationMessage,
      },
    },
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Contact.sync();

export default Contact;
