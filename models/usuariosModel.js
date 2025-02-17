import { pool } from '../database/connection.js';
import format from "pg-format";

const getAllUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows; // Retorna todos los usuarios
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    throw error;
  }
};

const createUser = async ({nombre, email, password, rol = 2}) => {
  const query = format(
    `INSERT INTO usuarios (usu_nombre, usu_email, usu_contrasena, rol_id)
     VALUES (%L, %L, %L, %L)
     RETURNING *;`,
    nombre, email, password, rol
  );
  const result = await pool.query(query);
  return result.rows[0];
};

const getUser = async (usu_email='') => {
  try {
    const query = format("SELECT 1 FROM usuarios WHERE usu_email = %L", usu_email);
    const result = await pool.query(query);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    throw error;
  }
};

const getContrasena = async (usu_email) => {
  try {
    const query = format("SELECT usu_contrasena, usu_id FROM usuarios WHERE usu_email = %L", usu_email);
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      const usu_contrasena = result.rows[0].usu_contrasena;
      const usu_id = result.rows[0].usu_id;
      return {
        passwordBD: usu_contrasena,
        id: usu_id
      };
    }
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    throw error;
  }
};

const verifyUserEmail = async (usu_email='') => {

  try {
     const query = format("SELECT 1 FROM usuarios WHERE usu_email = %L", usu_email);
     const result = await pool.query(query);
    return result.rowCount > 0; // Devuelve true si el email existe, false si no existe
  } catch (error) {
    console.error("Error al verificar email:", error.message);
    throw error;
  }
};

export const getRol = async (usu_id) => {
  try {
    const query = format(
      `SELECT rol_id FROM usuarios WHERE usu_id = %L`, 
      usu_id
    );

    const { rows } = await pool.query(query);
    
    if (rows.length === 0) {
      return null; // Retorna null si el usuario no existe
    }

    return rows[0].rol_id; // Devuelve el rol del usuario
  } catch (error) {
    console.error("Error al obtener el rol del usuario:", error);
    throw new Error("Error al consultar el rol del usuario");
  }
};

export const usersModel = {
  verifyUserEmail,
  createUser,
  getAllUsers,
  getUser,
  getContrasena,
  getRol
};
