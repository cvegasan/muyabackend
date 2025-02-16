import { pool } from '../database/connection.js';
import format from "pg-format";

const getAllMetodoPagos = async () => {
    const query = 'SELECT * FROM metodo_pagos';
    const { rows } = await pool.query(query);
    return rows;
};

const getAllMetodoPagosById = async (id) => {
    const query = format('SELECT * FROM metodo_pagos WHERE met_id = %L', id);
    const { rows } = await pool.query(query);
    return rows[0];
};

const postCrearMetodoPagos = async ({ met_id, met_descripcion }) => {
    const query = format(
        'INSERT INTO metodo_pagos (met_id, met_descripcion) VALUES (%L, %L) RETURNING met_id',
        met_id, met_descripcion
    );
    const { rows } = await pool.query(query);
    return rows[0];
};

const putActualizarMetodoPagos = async (id, { met_descripcion }) => {
    const query = format(
        'UPDATE metodo_pagos SET met_descripcion = %L WHERE met_id = %L',
        met_descripcion, id
    );
    await pool.query(query);
};

const deleteEliminarMetodoPagos = async (id) => {
    const query = format('DELETE FROM metodo_pagos WHERE met_id = %L', id);
    await pool.query(query);
};

export const metodopagosModel = {
    getAllMetodoPagos,
    getAllMetodoPagosById,
    postCrearMetodoPagos,
    putActualizarMetodoPagos,
    deleteEliminarMetodoPagos
  };