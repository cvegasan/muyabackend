import { estadoPagosModel } from '../models/estadopagosModel.js';
import dotenv from "dotenv";

dotenv.config();

const getAllEstadoPagos = async (req, res) => {
    try {
        const estados = await estadoPagosModel.getAllEstadoPagos();
        if (estados.length === 0) {
            return res.json({ message: 'No hay estados de pago registrados' });
        }
        res.json(estados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estados de pago' });
    }
};

const getEstadoPagosById = async (req, res) => {
    try {
        const { id } = req.params;
        const estado = await estadoPagosModel.getEstadoPagosById(id);
        if (!estado) return res.status(404).json({ error: 'Estado de pago no encontrado' });
        res.json(estado);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el estado de pago' });
    }
};

const postCrearEstadoPagos = async (req, res) => {
    try {
        const nuevoEstado = await estadoPagosModel.postCrearEstadoPagos(req.body);
        res.status(201).json({ message: 'Estado de pago creado exitosamente', est_id: nuevoEstado.est_id });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el estado de pago' });
    }
};

const putActualizarEstadoPagos = async (req, res) => {
    try {
        const { id } = req.params;
        await estadoPagosModel.putActualizarEstadoPagos(id, req.body);
        res.json({ message: 'Estado de pago actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado de pago' });
    }
};

const deleteEliminarEstadoPagos = async (req, res) => {
    try {
        const { id } = req.params;
        await estadoPagosModel.deleteEliminarEstadoPagos(id);
        res.json({ message: 'Estado de pago eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el estado de pago' });
    }
};



export const estadoPagosController = {
    getAllEstadoPagos,
    getEstadoPagosById,
    postCrearEstadoPagos,
    putActualizarEstadoPagos,
    deleteEliminarEstadoPagos
  };