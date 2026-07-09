
// Servicio de autenticación - contiene la lógica de negocio

// Credenciales hardcodeadas (en un proyecto real vendrían de la base de datos)
const VALID_USER = {
  email: "admin@techlab.com",
  password: "admin123",
};

// Valida que el email y la contraseña coincidan con las credenciales almacenadas
const validateCredentials = async (email, password) => {
  return email === VALID_USER.email && password === VALID_USER.password;
};

export { validateCredentials };