import { pagoModel } from '../models/pagoModel.js';
import dotenv from "dotenv";

dotenv.config();


const getAllPago = async (req, res) => {
    try {
        const pagos = await pagoModel.getAllPago();
        if (pagos.length === 0) {
            return res.json({ message: 'No hay pagos registrados' });
        }
        res.json(pagos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pagos' });
    }
};

const getPagoById = async (req, res) => {
    try {
        const { id } = req.params;
        const pago = await pagoModel.getPagoById(id);
        if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });
        res.json(pago);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el pago' });
    }
};

const postCrearPago = async (req, res) => {
    try {
        const nuevoPago = await pagoModel.postCrearPago(req.body);
        res.status(201).json({ message: 'Pago creado exitosamente', pag_id: nuevoPago.pag_id });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el pago' });
    }
};

const putActualizarPago = async (req, res) => {
    try {
        const { id } = req.params;
        await pagoModel.putActualizarPago(id, req.body);
        res.json({ message: 'Pago actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el pago' });
    }
};

const deleteEliminarPago = async (req, res) => {
    try {
        const { id } = req.params;
        await pagoModel.deleteEliminarPago(id);
        res.json({ message: 'Pago eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el pago' });
    }
};

export const pagoController = {
    getAllPago,
    getPagoById,
    postCrearPago,
    putActualizarPago,
    deleteEliminarPago };