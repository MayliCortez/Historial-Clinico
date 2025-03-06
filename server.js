const express = require("express");
const app = express();
const PORT = 3000;

// Importar la conexión a la base de datos y modelos
const sequelize = require("./config/database");
const User = require("./models/User");
const HistoriaClinica = require("./models/HistoriaClinica"); // Importar modelo

(async () => {
  try {
    // Sincronizar las tablas con la base de datos
    await sequelize.sync({ force: true }); // Esto BORRA y recrea las tablas (útil solo en desarrollo)
    console.log("¡Base de datos sincronizada!");

    // Insertar datos de prueba
    const medico = await User.create({
      nombre: "Dr. Juan Pérez",
      email: "juan@clinica.com",
      contraseña: "12345678", // Sin bcrypt en este ejemplo (puedes agregarlo después)
      rol: "medico",
    });

    const paciente = await User.create({
      nombre: "Carlos Ramírez",
      email: "carlos@paciente.com",
      contraseña: "12345678", // Sin bcrypt en este ejemplo
      rol: "paciente",
    });

    await HistoriaClinica.create({
      paciente_id: paciente.id, // ID del paciente
      medico_id: medico.id,     // ID del médico
      diagnostico: "Diagnóstico de hipertensión crónica.",
      tratamiento: "Medicamentos antihipertensivos y dieta baja en sodio.",
      fecha_consulta: new Date(),
    });
    
    console.log("Datos de prueba insertados correctamente");
  } catch (error) {
    console.error("Error al sincronizar la base de datos o insertar datos de prueba:", error);
  }
})();

// Rutas básicas
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
