import { pool } from '../database/connection.js';
import format from "pg-format";

const getAllEstadoPagos = async () => {
    const query = 'SELECT * FROM estado_pagos';
    const { rows } = await pool.query(query);
    return rows;
};

const getEstadoPagosById = async (id) => {
    const query = format('SELECT * FROM estado_pagos WHERE est_id = %L', id);
    const { rows } = await pool.query(query);
    return rows[0];
};

const postCrearEstadoPagos = async ({ est_id, est_descripcion }) => {
    const query = format(
        'INSERT INTO estado_pagos (est_id, est_descripcion) VALUES (%L, %L) RETURNING est_id',
        est_id, est_descripcion
    );
    const { rows } = await pool.query(query);
    return rows[0];
};

const putActualizarEstadoPagos = async (id, { est_descripcion }) => {
    const query = format(
        'UPDATE estado_pagos SET est_descripcion = %L WHERE est_id = %L',
        est_descripcion, id
    );
    await pool.query(query);
};

const deleteEliminarEstadoPagos = async (id) => {
    const query = format('DELETE FROM estado_pagos WHERE est_id = %L', id);
    await pool.query(query);
};

export const estadoPagosModel = {
    getAllEstadoPagos,
    getEstadoPagosById,
    postCrearEstadoPagos,
    putActualizarEstadoPagos,
    deleteEliminarEstadoPagos
  };