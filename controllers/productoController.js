import { productoModel } from '../models/productoModel.js';
import dotenv from "dotenv";

dotenv.config();

const getAllProductos = async (req, res) => {
    try {
        const productos = await productoModel.getAllProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

const getProductoById = async (req, res) => {
    const id = req.params.id;

    try {
        const producto = await productoModel.getProductoById(id);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

const postCrearProducto = async (req, res) => {
    const nuevoProducto = req.body;
    try {
        const productoCreado = await productoModel.postCrearProducto(nuevoProducto);
        res.status(201).json(productoCreado);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

const putActualizarProducto = async (req, res) => {
    try {
      const productoActualizado = await productoModel.putActualizarProducto(req.params.id, req.body);
      if (!productoActualizado) return res.status(404).json({ error: "Producto no encontrado" });
      res.json(productoActualizado);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el producto" });
    }
  };
  
  const deleteEliminarProducto = async (req, res) => {
    try {
      await productoModel.deleteEliminarProducto(req.params.id);
      res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el producto" });
    }
  };

export const productoController = {
    getAllProductos,
    getProductoById,
    postCrearProducto,
    putActualizarProducto,
    deleteEliminarProducto
  };