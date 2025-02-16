import { pool } from '../database/connection.js';
import format from "pg-format";

const getAllProductos = async () => {
    try {
      const query = `SELECT * FROM productos`;
      const res = await pool.query(query);
      return res.rows;
    } catch (err) {
      console.error('Error al obtener productos:', err);
      throw err;
    }
  };

  // Función para encontrar un producto por ID
  const getProductoById = async (id) => {
    try {
      const query = format(`SELECT * FROM productos WHERE pro_id = %L`, id)
      const res = await pool.query(query);
      return res.rows[0]; // Devuelve el primer producto encontrado
    } catch (err) {
      console.error('Error al encontrar el producto:', err);
      throw err;
    }
  };

  // Función para crear un nuevo producto
  const postCrearProducto = async (producto) => {
    const { pro_descripcion, pro_caracteristica, pro_precio, pro_stock, pro_imagen_url, cat_id } = producto;
    const query = format(
      `INSERT INTO productos (pro_descripcion, pro_caracteristica, pro_precio, pro_stock, pro_imagen_url, cat_id)
       VALUES (%L, %L, %s, %s, %L, %s) RETURNING *`,
      pro_descripcion, pro_caracteristica, pro_precio, pro_stock, pro_imagen_url, cat_id
    );
    const result = await pool.query(query);
    return result.rows[0];
  };

  const putActualizarProducto = async (id, producto) => {
    try {
      const { pro_descripcion, pro_caracteristica, pro_precio, pro_stock, pro_imagen_url, cat_id } = producto;

      const query = format(
        `UPDATE productos
         SET pro_descripcion = %L, pro_caracteristica = %L, pro_precio = %s, pro_stock = %s, pro_imagen_url = %L, cat_id = %s 
         WHERE pro_id = %s RETURNING *`,
        pro_descripcion, pro_caracteristica, pro_precio, pro_stock, pro_imagen_url, cat_id, id
      );

      const result = await pool.query(query);

      return result.rows[0] || null;
    } catch (error) {
      console.error("Error en updateProducto:", error);
      throw error;
    }
  };

  const deleteEliminarProducto = async (id) => {
    try {
      const query = format(`DELETE FROM productos WHERE pro_id = %s RETURNING *`, id);
      const result = await pool.query(query);
      return result.rowCount > 0;
    } catch (error) {
      console.error("Error en deleteProducto:", error);
      throw error;
    }
  };




  // Exporta las funciones para usarlas en otros módulos
  export const productoModel = {
    getAllProductos,
    getProductoById,
    postCrearProducto,
    putActualizarProducto,
    deleteEliminarProducto
  };
