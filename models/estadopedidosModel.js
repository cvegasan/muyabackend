import { pool } from '../database/connection.js';
import format from "pg-format";

const getAllEstadoPedidos = async () => {
  const result = await pool.query("SELECT * FROM estado_pedidos");
  return result.rows;
};

const getEstadoPedidosById = async (id) => {
  const query = format("SELECT * FROM estado_pedidos WHERE esp_id = %L", id);
  const result = await pool.query(query);
  return result.rows[0] || null;
};

const postCrearEstadoPedidos = async (esp_descripcion) => {
  const query = format(
    "INSERT INTO estado_pedidos (esp_descripcion) VALUES (%L) RETURNING *",
    esp_descripcion
  );
  const result = await pool.query(query);
  return result.rows[0];
};

const putActualizarEstadoPedidos = async (id, esp_descripcion) => {
  const query = format(
    "UPDATE estado_pedidos SET esp_descripcion = %L WHERE esp_id = %L RETURNING *",
    esp_descripcion,
    id
  );
  const result = await pool.query(query);
  return result.rowCount > 0;
};

const deleteEliminarEstadoPedidos = async (id) => {
  const query = format("DELETE FROM estado_pedidos WHERE esp_id = %L", id);
  const result = await pool.query(query);
  return result.rowCount > 0;
};

export const estadoPedidosModel = {
    getAllEstadoPedidos,
    getEstadoPedidosById,
    postCrearEstadoPedidos,
    putActualizarEstadoPedidos,
    deleteEliminarEstadoPedidos
  };