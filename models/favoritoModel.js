import { pool } from '../database/connection.js';
import format from "pg-format";

// Obtener todos los favoritos
const getAllFavoritos = async () => {
  try {
    const query = `SELECT
                      u.usu_id
                      ,u.usu_nombre
                      ,cat_nombre
                      ,p.pro_descripcion
                    FROM favoritos f
                    INNER JOIN usuarios u
                      ON f.usu_id=u.usu_id
                    INNER JOIN productos p
                      ON f.pro_id=p.pro_id
                    INNER JOIN categorias c
                      ON c.cat_id=p.cat_id`;
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return { message: "No hay favoritos registrados" };
    }
  } catch (error) {
    throw new Error("Error al obtener favoritos");
  }
};

// Obtener un favorito por ID favorito
const getFavoritosById = async (id) => {
  try {
    const query = format("SELECT * FROM favoritos WHERE fav_id = %L", id);
    const result = await pool.query(query);
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return { message: "Favorito no encontrado" };
      }
  } catch (error) {
    throw new Error("Error al obtener el favorito");
  }
};

// Obtener un favorito por ID usuario
const getUserFavoritos = async (usu_id = 0) => {
  try {
    const query = format("SELECT fav_id, usu_id, pro_id, fecha FROM favoritos WHERE usu_id = %L", usu_id);
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return { message: `Favorito por usuario ${usu_id} no encontrado` };
    }
  } catch (error) {
    console.error("Error al obtener favoritos de un usuario:", error.message);
    throw error;
  }
};

// Obtener un favorito por ID Producto
const getProdFavoritos = async (pro_id=0) => {
  try {
    const query = format("SELECT fav_id, usu_id, pro_id, fecha FROM favoritos WHERE pro_id = %L", pro_id);
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return { message: `Favorito por producto ${pro_id} no encontrado` };
    }
  } catch (error) {
    console.error("Error al obtener producto favorito:", error.message);
    throw error;
  }
};


// Crear un nuevo favorito
const postCrearFavoritos = async ({ usu_id, pro_id }) => {
  try {
    const query = format(
      //"INSERT INTO favoritos (usu_id, pro_id) VALUES (%L, %L) RETURNING *",
      // `INSERT INTO favoritos (usu_id, pro_id)
      //    VALUES (%L, %L)
      //    RETURNING fav_id,
      //              (SELECT usu_nombre FROM usuarios WHERE usuarios.usu_id = favoritos.usu_id) AS usu_nombre,
      //              (SELECT pro_descripcion FROM productos WHERE productos.pro_id = favoritos.pro_id) AS pro_descripcion,
      //              fecha`,
      `WITH inserted AS (
            INSERT INTO favoritos (usu_id, pro_id)
            VALUES (%L, %L)
            RETURNING fav_id, usu_id, pro_id, fecha
        )
        SELECT i.fav_id, u.usu_nombre, p.pro_descripcion, i.fecha
        FROM inserted i
        INNER JOIN usuarios u ON i.usu_id = u.usu_id
        INNER JOIN productos p ON i.pro_id = p.pro_id;`,
      usu_id, pro_id
    );
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al crear el favorito");
  }
};

// Actualizar un favorito
const putActualizarFavoritos = async (fav_id, { usu_id, pro_id }) => {
  try {
    const query = format(
      // "UPDATE favoritos SET usu_id = %L, pro_id = %L WHERE fav_id = %L RETURNING *",
        `WITH updated AS (
          UPDATE favoritos 
            SET usu_id = %L, pro_id = %L 
          WHERE fav_id = %L 
          RETURNING fav_id, usu_id, pro_id, fecha
        )
        SELECT u.fav_id, us.usu_nombre, p.pro_descripcion, u.fecha
        FROM updated u
        INNER JOIN usuarios us ON u.usu_id = us.usu_id
        INNER JOIN productos p ON u.pro_id = p.pro_id;`,
    usu_id, pro_id, fav_id
    );
    const result = await pool.query(query);
    return result.rows.length > 0 ? result.rows[0] : { message: "Favorito no encontrado" };
  } catch (error) {
    throw new Error("Error al actualizar el favorito");
  }
};

// Eliminar un favorito
const deleteEliminarFavoritos = async (usu_id, pro_id) => {
   try {
    // const query = format("DELETE FROM favoritos WHERE fav_id = %L RETURNING *", id);
    const query = format(
      `DELETE FROM favoritos 
       WHERE usu_id = %L AND pro_id = %L 
       RETURNING fav_id, usu_id, pro_id, fecha;`,
      usu_id, pro_id
    );
    const result = await pool.query(query);
    return result.rows.length > 0 ? { message: "Favorito eliminado correctamente" } : { message: "Favorito no encontrado" };
   } catch (error) {
     throw new Error("Error al eliminar el favorito");
   }
};

export const favoritosModel = {
    getAllFavoritos,
    getFavoritosById,
    getUserFavoritos,
    getProdFavoritos,
    postCrearFavoritos,
    putActualizarFavoritos,
    deleteEliminarFavoritos
  };