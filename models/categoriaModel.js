import { pool } from '../database/connection.js';
import format from "pg-format";

// Obtener todas las categoria
const getAllCategoria = async () => {
    try {
        const query = "SELECT * FROM categorias";
        const result = await pool.query(query);
        return result.rows;
      } catch (error) {
        console.error("Error en getCategorias:", error);
        throw error;
      }
};

// Obtener un categoria por ID
const getCategoriaById = async (id) => {
    try {
        const query = format("SELECT * FROM categorias WHERE cat_id = %s", id);
        const result = await pool.query(query);
        return result.rows[0] || null;
      } catch (error) {
        console.error("Error en getCategoriaById:", error);
        throw error;
      }
};

// Crear un nueva categoria
const postCrearCategoria = async (categoria) => {
    try {
        const { cat_nombre } = categoria;
        const query = format(
          "INSERT INTO categorias (cat_nombre) VALUES (%L) RETURNING *",
          cat_nombre
        );

        const result = await pool.query(query);
        return result.rows[0];
      } catch (error) {
        console.error("Error en createCategoria:", error);
        throw error;
      }
};

// Actualizar un categoria
const putActualizarCategoria = async (id, categoria) => {
    try {
        const { cat_nombre } = categoria;
        const query = format(
          "UPDATE categorias SET cat_nombre = %L WHERE cat_id = %s RETURNING *",
          cat_nombre, id
        );

        const result = await pool.query(query);
        return result.rows[0] || null;
      } catch (error) {
        console.error("Error en updateCategoria:", error);
        throw error;
      }
};

// Eliminar un categoria
const deleteEliminarCategoria = async (id) => {
    try {
        const query = format("DELETE FROM categorias WHERE cat_id = %s RETURNING *", id);
        const result = await pool.query(query);
        return result.rowCount > 0;
      } catch (error) {
        console.error("Error en deleteCategoria:", error);
        throw error;
      }
};


export const categoriaModel = {
    getAllCategoria,
    getCategoriaById,
    postCrearCategoria,
    putActualizarCategoria,
    deleteEliminarCategoria
  };
