const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt"); // Importa bcrypt para usarlo en los hooks
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  contraseña: { type: DataTypes.STRING, allowNull: false }, // La contraseña será almacenada como hash
  rol: { type: DataTypes.ENUM("medico", "administracion", "paciente"), allowNull: false },
});

// Hook para encriptar la contraseña antes de crear un usuario
User.addHook("beforeCreate", async (user) => {
  if (user.contraseña) {
    user.contraseña = await bcrypt.hash(user.contraseña, 10); // Encripta la contraseña
  }
});

// Hook para encriptar contraseñas en bulkCreate
User.addHook("beforeBulkCreate", async (users) => {
  for (const user of users) {
    if (user.contraseña) {
      user.contraseña = await bcrypt.hash(user.contraseña, 10); // Encripta cada contraseña en bulkCreate
    }
  }
});

module.exports = User;
