const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña de la base de datos
  {
    host: process.env.DB_HOST, // Dirección del servidor
    dialect: "mysql", // Usamos MySQL como dialecto
  }
);

sequelize.authenticate()
  .then(() => console.log("Conexión a la base de datos exitosa"))
  .catch((error) => console.error("Error de conexión a la base de datos:", error));


module.exports = sequelize;
