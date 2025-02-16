import { pedidoModel } from '../models/pedidoModel.js';

const getAllPedido = async (req, res) => {
    try {
        const pedidos = await pedidoModel.getAllPedido();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPedidoByUser = async (req, res) => {
    try {
        const pedidos = await pedidoModel.getPedidoByUser(req.params.id);
        if (!pedidos) return res.status(404).json({ error: "Pedidos no encontrados" });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postCreatePedido = async (req, res) => {
    try {
        const nuevoPedido = await pedidoModel.postCreatePedido(req.body);
        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const putUpdatePedido = async (req, res) => {
    try {
        const ped_id = req.params.id;  // Extraer desde params si es necesario
        console.log("ped_id-->",ped_id)
        const { usu_id, ped_total, esp_id, detalles } = req.body;
        if (!ped_id) {
            return res.status(400).json({ error: "El ID del pedido es obligatorio" });
        }

        const updatedPedido  = await pedidoModel.putUpdatePedido({ ped_id, usu_id, ped_total, esp_id, detalles });
        res.status(201).json(updatedPedido);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const pedidoController = {
    getAllPedido,
    getPedidoByUser,
    postCreatePedido,
    putUpdatePedido
  };