import { categoriaModel } from '../models/categoriaModel.js';
import dotenv from "dotenv";

dotenv.config();

// Obtener todas las categorías
const getAllCategoria = async (req, res) => {
    try {
      const categorias = await categoriaModel.getAllCategoria();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las categorías" });
    }
  };
  
  // Obtener una categoría por ID
  const getCategoriaById = async (req, res) => {
    try {
      const categoria = await categoriaModel.getCategoriaById(req.params.id);
      if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la categoría" });
    }
  };
  
  // Crear una nueva categoría
  const postCrearCategoria = async (req, res) => {
    try {
      const nuevaCategoria = await categoriaModel.postCrearCategoria(req.body);
      res.status(201).json(nuevaCategoria);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la categoría" });
    }
  };
  
  // Actualizar una categoría
  const putActualizarCategoria = async (req, res) => {
    try {
      const categoriaActualizada = await categoriaModel.putActualizarCategoria(req.params.id, req.body);
      if (!categoriaActualizada) return res.status(404).json({ error: "Categoría no encontrada" });
      res.json(categoriaActualizada);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la categoría" });
    }
  };

  // Eliminar una categoría
  const deleteEliminarCategoria = async (req, res) => {
    try {
      const eliminado = await categoriaModel.deleteEliminarCategoria(req.params.id);
      if (!eliminado) return res.status(404).json({ error: "Categoría no encontrada" });
      res.json({ message: "Categoría eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la categoría" });
    }
  };


export const categoriaController = {
    getAllCategoria,
    getCategoriaById,
    postCrearCategoria,
    putActualizarCategoria,
    deleteEliminarCategoria
  };