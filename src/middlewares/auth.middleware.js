// Importaciones
import jwt from "jsonwebtoken";

// Middleware de autenticación - verifica el token JWT en el header Authorization
const authMiddleware = (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;

    // Verificar que el header exista y tenga el formato correcto
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    // Extraer el token (quitar el prefijo "Bearer ")
    const token = authHeader.split(" ")[1];

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar el usuario decodificado al request para uso posterior
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};

export { authMiddleware };