import { pool } from '../database/connection.js';
import format from "pg-format";


// Obtener todas las reseñas
const getAllResena = async (id) => {
  try {
    const query = format(`SELECT * FROM resenas`);
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error en getAllResena:", error);
    throw error;
  }
};

// Obtener una reseña por ID
const getResenaById = async (id) => {
  try {
    const query = format(`SELECT * FROM resenas WHERE res_id = %s`, id);
    const result = await pool.query(query);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error en getResenaById:", error);
    throw error;
  }
};

// Obtener todas las reseñas por id producto
const getResenaByIdProd = async (id) => {
  try {
    const query = format(`SELECT
                            u.usu_nombre
                            ,res_comentario
                            ,res_calificacion
                            ,res_fecha
                          FROM 
                          resenas r 
                          INNER JOIN usuarios u
                            on u.usu_id = r.usu_id
                          WHERE pro_id = %s;`, id);
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error en getResenaByIdProd:", error);
    throw error;
  }
};

const getResenaByUser = async (id) => {
  try {
    const query = format(`SELECT
                                u.usu_id
                                ,u.usu_nombre
                                ,r.pro_id
                                ,p.pro_descripcion
                                ,r.res_calificacion
                                ,r.res_comentario
                                ,r.res_fecha
                          FROM
                            usuarios u
                            INNER JOIN resenas r
                              ON u.usu_id=r.usu_id
                            INNER JOIN productos p
                              ON r.pro_id=p.pro_id
                          WHERE u.usu_id = %s`, id);

    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error en getResenaByUser:", error);
    throw error;
  }
};

// Crear una nueva reseña
const postCrearResena = async (resena) => {
  try {
    const { usu_id, pro_id, res_calificacion, res_comentario } = resena;
    const query = format(
      "INSERT INTO resenas (usu_id, pro_id, res_calificacion, res_comentario) VALUES (%s, %s, %s, %L) RETURNING *",
      usu_id, pro_id, res_calificacion, res_comentario
    );

    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    console.error("Error en createResena:", error);
    throw error;
  }
};

// Actualizar una reseña
const putActualizarResena = async (id, resena) => {
  try {
    const { res_calificacion, res_comentario } = resena;
    const query = format(
      "UPDATE resenas SET res_calificacion = %s, res_comentario = %L WHERE res_id = %s RETURNING *",
      res_calificacion, res_comentario, id
    );

    const result = await pool.query(query);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error en updateResena:", error);
    throw error;
  }
};

// Eliminar una reseña
const deleteEliminarResena = async (id) => {
  try {
    const query = format("DELETE FROM resenas WHERE res_id = %s RETURNING *", id);
    const result = await pool.query(query);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en deleteResena:", error);
    throw error;
  }
};

export const resenaModel = {
    getAllResena,
    getResenaById,
    getResenaByIdProd,
    getResenaByUser,
    postCrearResena,
    putActualizarResena,
    deleteEliminarResena
  };
