import { metodopagosModel } from '../models/metodopagosModel.js';
import dotenv from "dotenv";

dotenv.config();

const getAllMetodoPagos = async (req, res) => {
    try {
        const metodos = await metodopagosModel.getAllMetodoPagos();
        if (metodos.length === 0) {
            return res.json({ message: 'No hay métodos de pago registrados' });
        }
        res.json(metodos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los métodos de pago' });
    }
};

const getMetodoPagosById = async (req, res) => {
    try {
        const { id } = req.params;
        const metodo = await metodopagosModel.getMetodoPagosById(id);
        if (!metodo) return res.status(404).json({ error: 'Método de pago no encontrado' });
        res.json(metodo);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el método de pago' });
    }
};

const postCrearMetodoPagos = async (req, res) => {
    try {
        const nuevoMetodo = await metodopagosModel.postCrearMetodoPagos(req.body);
        res.status(201).json({ message: 'Método de pago creado exitosamente', met_id: nuevoMetodo.met_id });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el método de pago' });
    }
};

const putActualizarMetodoPagos = async (req, res) => {
    try {
        const { id } = req.params;
        await metodopagosModel.putActualizarMetodoPagos(id, req.body);
        res.json({ message: 'Método de pago actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el método de pago' });
    }
};

const deleteEliminarMetodoPagos = async (req, res) => {
    try {
        const { id } = req.params;
        await metodopagosModel.deleteEliminarMetodoPagos(id);
        res.json({ message: 'Método de pago eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el método de pago' });
    }
};

export const metodopagosController = {
    getAllMetodoPagos,
    getMetodoPagosById,
    postCrearMetodoPagos,
    putActualizarMetodoPagos,
    deleteEliminarMetodoPagos };