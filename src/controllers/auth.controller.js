// Importaciones
import jwt from "jsonwebtoken";
import * as authService from "../services/auth.service.js";

// Autentica al usuario y devuelve un token
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar que se envíen las credenciales
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    // Validar que las credenciales coincidan a través del servicio
    const isValid = await authService.validateCredentials(email, password);

    if (!isValid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar token JWT con expiración de 1 hora
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export { login };
