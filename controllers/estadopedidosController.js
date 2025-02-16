import { estadoPedidosModel } from '../models/estadopedidosModel.js';
import dotenv from "dotenv";

dotenv.config();

const getAllEstadoPedidos = async (req, res) => {
  try {
    const estadosPedidos = await estadoPedidosModel.getAllEstadoPedidos();
    if (estadosPedidos.length === 0) {
      return res.status(404).json({ message: "No hay estados de pedidos registrados" });
    }
    res.json(estadosPedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los estados de pedidos" });
  }
};

const getEstadoPedidosById = async (req, res) => {
  const { id } = req.params;
  try {
    const estadoPedido = await estadoPedidosModel.getEstadoPedidosById(id);
    if (!estadoPedido) {
      return res.status(404).json({ error: "Estado de pedido no encontrado" });
    }
    res.json(estadoPedido);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el estado de pedido" });
  }
};

const postCrearEstadoPedidos = async (req, res) => {
  const { esp_descripcion } = req.body;
  try {
    const nuevoEstadoPedido = await estadoPedidosModel.postCrearEstadoPedidos(esp_descripcion);
    res.status(201).json({
      message: "Estado de pedido creado exitosamente",
      estado_pedido: nuevoEstadoPedido,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el estado de pedido" });
  }
};

const putActualizarEstadoPedidos = async (req, res) => {
  const { id } = req.params;
  const { esp_descripcion } = req.body;
  try {
    const actualizado = await estadoPedidosModel.putActualizarEstadoPedidos(id, esp_descripcion);
    if (!actualizado) {
      return res.status(404).json({ error: "Estado de pedido no encontrado" });
    }
    res.json({ message: "Estado de pedido actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el estado de pedido" });
  }
};

const deleteEliminarEstadoPedidos = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await estadoPedidosModel.deleteEstadoPedido(id);
    if (!eliminado) {
      return res.status(404).json({ error: "Estado de pedido no encontrado" });
    }
    res.json({ message: "Estado de pedido eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el estado de pedido" });
  }
};

export const estadoPedidosController = {
    getAllEstadoPedidos,
    getEstadoPedidosById,
    postCrearEstadoPedidos,
    putActualizarEstadoPedidos,
    deleteEliminarEstadoPedidos
  };