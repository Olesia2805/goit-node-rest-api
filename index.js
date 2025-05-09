import sequelize from "./db/Sequelize.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}

export default startServer;
