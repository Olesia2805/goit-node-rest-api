import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
