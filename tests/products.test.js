import { describe, test, expect, beforeAll } from "vitest";
import request from "supertest";
import dotenv from "dotenv";
import app from "../src/app.js";

dotenv.config();

let token;
let createdProductId;

// Antes de todos los tests, hacemos login para obtener el token
beforeAll(async () => {
  const res = await request(app)
    .post("/auth/login")
    .send({ email: "admin@techlab.com", password: "admin123" });
  token = res.body.token;
});

// Tests de autenticación
describe("POST /auth/login", () => {
  test("devuelve token con credenciales válidas", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "admin@techlab.com", password: "admin123" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("devuelve 401 con credenciales inválidas", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "malo@test.com", password: "incorrecta" });
    expect(res.status).toBe(401);
  });

  test("devuelve 400 si faltan datos", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "admin@techlab.com" });
    expect(res.status).toBe(400);
  });
});

// Tests de GET
describe("GET /api/products", () => {
  test("devuelve 401 sin token", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(401);
  });

  test("devuelve 200 con token válido", async () => {
    const res = await request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  test("la respuesta es un array", async () => {
    const res = await request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${token}`);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("filtra productos por categoría", async () => {
    const res = await request(app)
      .get("/api/products?category=Zapatillas")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((product) => {
      expect(product.category).toBe("Zapatillas");
    });
  });
});

// Tests de POST
describe("POST /api/products/create", () => {
  test("crea un producto con datos válidos", async () => {
    const res = await request(app)
      .post("/api/products/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Producto Test",
        description: "Descripción test",
        category: "Zapatillas",
        price: 999.99,
        stock: 10,
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    createdProductId = res.body.id;
  });

  test("devuelve 400 si faltan campos", async () => {
    const res = await request(app)
      .post("/api/products/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Solo título" });
    expect(res.status).toBe(400);
  });

  test("devuelve 400 si price es string", async () => {
    const res = await request(app)
      .post("/api/products/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test",
        description: "Test",
        category: "Test",
        price: "mil",
        stock: 10,
      });
    expect(res.status).toBe(400);
  });

  test("devuelve 400 si stock es negativo", async () => {
    const res = await request(app)
      .post("/api/products/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test",
        description: "Test",
        category: "Test",
        price: 1000,
        stock: -5,
      });
    expect(res.status).toBe(400);
  });

  test("devuelve 400 si price tiene más de 2 decimales", async () => {
    const res = await request(app)
      .post("/api/products/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test",
        description: "Test",
        category: "Test",
        price: 999.999,
        stock: 10,
      });
    expect(res.status).toBe(400);
  });
});

// Tests de DELETE
describe("DELETE /api/products/:id", () => {
  test("elimina el producto creado en los tests", async () => {
    const res = await request(app)
      .delete(`/api/products/${createdProductId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});

describe("Rutas desconocidas", () => {
  test("devuelve 404 para rutas no definidas", async () => {
    const res = await request(app).get("/ruta-inexistente");
    expect(res.status).toBe(404);
  });
});