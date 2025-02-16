import { pool } from '../database/connection.js';
import format from "pg-format";

const getAllPago = async () => {
    const query = 'SELECT * FROM pagos';
    const { rows } = await pool.query(query);
    return rows;
};

const getPagoById = async (id) => {
    const query = format('SELECT * FROM pagos WHERE pag_id = %L', id);
    const { rows } = await pool.query(query);
    return rows[0];
};

const postCrearPago = async ({ ped_id, met_id, est_id }) => {
    const query = format(
        'INSERT INTO pagos (ped_id, met_id, est_id) VALUES (%L, %L, %L) RETURNING pag_id',
        ped_id, met_id, est_id
    );
    const { rows } = await pool.query(query);
    return rows[0];
};

const putActualizarPago = async (id, { ped_id, met_id, est_id }) => {
    const query = format(
        'UPDATE pagos SET ped_id = %L, met_id = %L, est_id = %L WHERE pag_id = %L',
        ped_id, met_id, est_id, id
    );
    await pool.query(query);
};

const deleteEliminarPago = async (id) => {
    const query = format('DELETE FROM pagos WHERE pag_id = %L', id);
    await pool.query(query);
};

export const pagoModel = {
    getAllPago,
    getPagoById,
    postCrearPago,
    putActualizarPago,
    deleteEliminarPago
  };
