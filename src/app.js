// Importaciones
import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/products", productsRouter);
app.use("/auth", authRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("<h1>TechLab API</h1><p>Servidor funcionando correctamente</p>");
});

// Health check
app.get("/up", (req, res) => {
  res.json({ status: "ok", message: "Servidor activo" });
});

// Middleware para rutas desconocidas (404)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;