const { DataTypes } = require("sequelize");
const sequelize = require("./config/database");
const User = require("./models/User");
const HistoriaClinica = require("./models/HistoriaClinica");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function seedDatabase() {
  try {
    // Sincroniza la base de datos (recrea las tablas)
    await sequelize.sync({ force: true }); // Esto elimina y recrea las tablas
    console.log("¡Base de datos sincronizada!");

    // Crear usuarios iniciales con contraseñas encriptadas
    const usuarios = await Promise.all([
      User.create({
        nombre: "Dr. Juan Pérez",
        email: "juan@clinica.com",
        contraseña: await bcrypt.hash("123456", 10),
        rol: "medico",
      }),
      User.create({
        nombre: "Ana López",
        email: "ana@admin.com",
        contraseña: await bcrypt.hash("123456", 10),
        rol: "administracion",
      }),
      User.create({
        nombre: "Carlos Ramírez",
        email: "carlos@paciente.com",
        contraseña: await bcrypt.hash("123456", 10),
        rol: "paciente",
      }),
    ]);

    console.log("Usuarios iniciales creados.");

    // Obtener referencias de los usuarios
    const medico = usuarios.find(user => user.rol === "medico");
    const paciente = usuarios.find(user => user.rol === "paciente");

    // Crea una historia clínica asociada al médico y al paciente
    await HistoriaClinica.create({
      paciente_id: paciente.id,
      medico_id: medico.id,
      diagnostico: "Paciente con hipertensión arterial.",
      tratamiento: "Prescripción de medicamentos antihipertensivos y dieta baja en sodio.",
      fecha_consulta: new Date(),
    });

    console.log("Historia clínica creada con éxito.");
    process.exit(); // Finaliza el script después de completar
  } catch (error) {
    console.error("Error al insertar los datos:", error);
    process.exit(1); // Finaliza con error si ocurre algún problema
  }
}

// Ejecutar la función
seedDatabase();
