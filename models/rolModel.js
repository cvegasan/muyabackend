import { pool } from '../database/connection.js';
import format from "pg-format";

// Obtener todos los roles
const getAllRoles = async () => {
  try {
    const query = "SELECT * FROM roles";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error en getRoles:", error);
    throw error;
  }
};

// Obtener un rol por ID
const getRolById = async (id) => {
  try {
    const query = format("SELECT * FROM roles WHERE rol_id = %s", id);
    const result = await pool.query(query);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error en getRolById:", error);
    throw error;
  }
};

// Crear un nuevo rol
const postCrearRol = async (rol) => {
  try {
    const { rol_id, rol_descripcion } = rol;
    const query = format(
      "INSERT INTO roles (rol_id, rol_descripcion) VALUES (%s, %L) RETURNING *",
      rol_id, rol_descripcion
    );

    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    console.error("Error en createRol:", error);
    throw error;
  }
};

// Actualizar un rol
const putActualizarRol = async (id, rol) => {
  try {
    const { rol_descripcion } = rol;
    const query = format(
      "UPDATE roles SET rol_descripcion = %L WHERE rol_id = %s RETURNING *",
      rol_descripcion, id
    );

    const result = await pool.query(query);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error en updateRol:", error);
    throw error;
  }
};

// Eliminar un rol
const deleteEliminarRol = async (id) => {
  try {
    const query = format("DELETE FROM roles WHERE rol_id = %s RETURNING *", id);
    const result = await pool.query(query);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en deleteRol:", error);
    throw error;
  }
};


export const rolModel = {
    getAllRoles,
    getRolById,
    postCrearRol,
    putActualizarRol,
    deleteEliminarRol
  };
  