
# TechLab API (Proyecto Final Back-End/Node-JS)

API REST desarrollada en Node.js con Express que permite administrar el catálogo de productos de una tienda en línea. Habilita operaciones de lectura, creación, actualización y eliminación de productos almacenados en la nube mediante Firestore de Firebase, con autenticación basada en JWT.

## Requisitos

- Node.js instalado
- Cuenta en Firebase con un proyecto de Firestore configurado

## Instalación

```bash
npm install
```

## Configuración

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables (ver `.env.example`):

```
PORT=3000

FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_STORAGE_BUCKET=tu_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
FIREBASE_APP_ID=tu_app_id

JWT_SECRET=tu_clave_secreta_para_jwt
```

## Uso

### Iniciar el servidor

```bash
npm run start
```

### Iniciar en modo desarrollo (con recarga automática)

```bash
npm run dev
```

### Ejecutar los tests

```bash
npm test
```

El servidor queda disponible en `http://localhost:3000`.

## Endpoints

### Autenticación

#### Login

```
POST /auth/login
```

Body:
```json
{
  "email": "admin@techlab.com",
  "password": "admin123"
}
```

Devuelve un Bearer Token que debe incluirse en el header `Authorization` de las rutas protegidas.

### Productos (rutas protegidas)

Todas las rutas de productos requieren el header:

```
Authorization: Bearer <token>
```

#### Obtener todos los productos

```
GET /api/products
```

#### Filtrar productos por categoría

```
GET /api/products?category=Zapatillas
```

La búsqueda es exacta y sensible a mayúsculas — `"Zapatillas"` no es igual a `"zapatillas"`.


#### Obtener un producto por ID

```
GET /api/products/:id
```

#### Crear un producto

```
POST /api/products/create
```

Body:
```json
{
  "title": "Nombre del producto",
  "price": 1000,
  "description": "Descripción del producto",
  "category": "categoría",
  "stock": 10
}
```

#### Actualizar un producto

```
PUT /api/products/:id
```

Body:
```json
{
  "title": "Nuevo nombre",
  "price": 1200
}
```


#### Eliminar un producto

```
DELETE /api/products/:id
```

## Manejo de errores

- `400` — faltan datos en la petición (Bad Request)
- `401` — token no proporcionado o credenciales inválidas
- `403` — token inválido o expirado
- `404` — ruta no encontrada
- `500` — error interno del servidor

## Arquitectura

src/
├── app.js          # Configuración de Express
├── config/         # Configuración de Firebase
├── controllers/    # Controladores de rutas
├── middlewares/    # Middleware de autenticación JWT
├── models/         # Acceso a datos con Firestore
├── routes/         # Definición de rutas
└── services/       # Lógica de negocio
tests/
└── products.test.js  # Tests con Vitest y Supertest```

## Tecnologías utilizadas

- Node.js
- Express
- ESModules
- Firebase / Firestore
- JSON Web Token (JWT)
- dotenv
- CORS
- Vitest
- Supertest
