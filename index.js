// Importaciones
import dotenv from "dotenv";
import app from "./src/app.js";

// Configuración de variables de entorno
dotenv.config();

const PORT = process.env.PORT || 3000;

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});