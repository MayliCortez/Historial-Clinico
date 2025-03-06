const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const HistoriaClinica = sequelize.define("HistoriaClinica", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  paciente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Relación con la tabla Users
      key: "id",
    },
    onDelete: "CASCADE", // Si se elimina el paciente, sus historias también se eliminan
  },
  medico_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Relación con la tabla Users (para el médico)
      key: "id",
    },
    onDelete: "CASCADE", // Si se elimina el médico, las historias relacionadas se eliminan
  },
  diagnostico: {
    type: DataTypes.TEXT,
    allowNull: false, // Es obligatorio registrar un diagnóstico
  },
  tratamiento: {
    type: DataTypes.TEXT,
    allowNull: false, // Es obligatorio registrar un tratamiento
  },
  fecha_consulta: {
    type: DataTypes.DATE,
    allowNull: false, // Fecha de la consulta médica
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Definir las relaciones
User.hasMany(HistoriaClinica, { foreignKey: "paciente_id", as: "HistoriasPaciente" });
User.hasMany(HistoriaClinica, { foreignKey: "medico_id", as: "HistoriasMedico" });

HistoriaClinica.belongsTo(User, { foreignKey: "paciente_id", as: "Paciente" });
HistoriaClinica.belongsTo(User, { foreignKey: "medico_id", as: "Medico" });

module.exports = HistoriaClinica;
