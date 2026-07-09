// Importaciones
import * as productsModel from "../models/products.model.js";

// Devuelve todos los productos
const getAll = async () => {
  return await productsModel.getAll();
};

// Devuelve productos filtrados por categoría
const getByCategory = async (category) => {
  return await productsModel.getByCategory(category);
};

// Devuelve un producto por ID
const getById = async (id) => {
  return await productsModel.getById(id);
};

// Crea un nuevo producto
const create = async (data) => {
  return await productsModel.create(data);
};

// Actualiza un producto por ID
const update = async (id, data) => {
  return await productsModel.update(id, data);
};

// Elimina un producto por ID
const remove = async (id) => {
  return await productsModel.remove(id);
};

export { getAll, getById, create, update, remove, getByCategory };
