import { pool } from '../database/connection.js';
import format from "pg-format";

const getAllPedido = async () => {
    const query = format(`SELECT * FROM pedidos`);
    const { rows } = await pool.query(query);
    return rows;
};

const getPedidoById = async (id) => {
    const pedidoQuery = format(`SELECT * FROM pedidos WHERE ped_id = %L`,id);
    const detallesQuery = format(`SELECT * FROM pedido_detalle WHERE ped_id = %L`,id);

    const { rows: pedidoRows } = await pool.query(pedidoQuery);
    const { rows: detallesRows } = await pool.query(detallesQuery);
    if (pedidoRows.length === 0) return null;
    return { ...pedidoRows[0], detalles: detallesRows };
};

const getPedidoByUser = async (id) => {
    try {
      const query = format(`SELECT
                                u.usu_id
								,usu_nombre
                                ,p.ped_id
                                ,p.ped_total
                                ,p.ped_fecha_pedido
                                ,pd.pro_id
                                ,pr.pro_descripcion
                                ,pd.det_cantidad
                                ,pd.det_precio_unitario
                        FROM
                            usuarios u
                            inner join pedidos p
                                on u.usu_id=p.usu_id
                            inner join pedido_detalle pd
                            on p.ped_id=pd.ped_id
                            inner join productos pr
                            on pd.pro_id=pr.pro_id
                        WHERE u.usu_id = %s`, id);
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error en getPedidoByUser:", error);
      throw error;
    }
  };

const postCreatePedido = async ({ usu_id, ped_total, esp_id, detalles }) => {
    const pedidoQuery = format(
    `INSERT INTO pedidos (usu_id, ped_total, esp_id) VALUES (%L, %L, %L) RETURNING *`,
        usu_id, ped_total, esp_id
    )
    const { rows } = await pool.query(pedidoQuery);
    const pedido = rows[0];

    let detallesInsertados = [];

    if (detalles && detalles.length > 0) {
        // Construir los valores de los detalles para la inserción masiva
        const valoresDetalles = detalles.map(detalle => [
            pedido.ped_id,
            detalle.pro_id,
            detalle.det_cantidad,
            detalle.det_precio_unitario
        ]);

        const detallesQuery = format(`
            INSERT INTO pedido_detalle (ped_id, pro_id, det_cantidad, det_precio_unitario)
            VALUES %L
            RETURNING *`, valoresDetalles);

        const { rows } = await pool.query(detallesQuery);
        detallesInsertados = rows;
    }
    // Insertar el pago
    const pagoQuery = format(
        `INSERT INTO pagos (ped_id, met_id, est_id)
        VALUES (%L, %L, %L)
        RETURNING *`,
        pedido.ped_id
        ,1 // ID del método de pago (ej. tarjeta)
        ,2 // ID del estado del pago (ej. completado)
    );

    const { rows: pagoRows } = await pool.query(pagoQuery);
    const pago = pagoRows[0];

    return { ...pedido, detalles: detallesInsertados, pago: pago};
};

const putUpdatePedido = async ({ ped_id, usu_id, ped_total, esp_id, detalles }) => {
    const pedidoQuery = format(
        `UPDATE pedidos
            SET usu_id = %L,
            ped_total = %L,
            esp_id = %L
        WHERE ped_id = %L
        RETURNING *`,
        usu_id, ped_total, esp_id, ped_id
    );

    const { rows } = await pool.query(pedidoQuery);

    if (rows.length === 0) {
        throw new Error(`Pedido con ID ${ped_id} no encontrado`);
    }
    const pedido = rows[0];

    // Eliminar los detalles existentes del pedido a actualizar
    await pool.query("DELETE FROM pedido_detalle WHERE ped_id = $1", [ped_id]);

    let detallesInsertados = [];

    if (detalles && detalles.length > 0) {
        for (const detalle of detalles) {
            // Verificar si el detalle ya existe
            const existeQuery = "SELECT * FROM pedido_detalle WHERE ped_id = $1 AND pro_id = $2";
            const { rows: existe } = await pool.query(existeQuery, [ped_id, detalle.pro_id]);

            if (existe.length > 0) {
                // Si el detalle ya existe, actualizarlo
                const updateDetalleQuery = format(
                    `UPDATE pedido_detalle
                    SET det_cantidad = %L, det_precio_unitario = %L
                    WHERE ped_id = %L AND pro_id = %L
                    RETURNING *`,
                    detalle.det_cantidad, detalle.det_precio_unitario, ped_id, detalle.pro_id
                );
                const { rows: updatedRows } = await pool.query(updateDetalleQuery);
                detallesInsertados.push(updatedRows[0]);
            } else {
                // Si el detalle no existe, insertarlo
                const insertDetalleQuery = format(
                    `INSERT INTO pedido_detalle (ped_id, pro_id, det_cantidad, det_precio_unitario)
                    VALUES (%L, %L, %L, %L)
                    RETURNING *`,
                    ped_id, detalle.pro_id, detalle.det_cantidad, detalle.det_precio_unitario
                );
                const { rows: insertedRows } = await pool.query(insertDetalleQuery);
                detallesInsertados.push(insertedRows[0]);
            }
        }
    }

    return { ...pedido, detalles: detallesInsertados };
};

export const pedidoModel = {
    getAllPedido,
    getPedidoById,
    getPedidoByUser,
    postCreatePedido,
    putUpdatePedido
  };