import { resenaModel } from '../models/resenaModel.js';
import dotenv from "dotenv";

dotenv.config();
// Obtener todas las reseñas
const getAllResena = async (req, res) => {
  try {
    const resenas = await resenaModel.getAllResena();
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reseñas" });
  }
};

// Obtener una reseña por ID
const getResenaById = async (req, res) => {
  try {
    const resena = await resenaModel.getResenaById(req.params.id);
    if (!resena) return res.status(404).json({ error: "Reseña no encontrada" });
    res.json(resena);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la reseña" });
  }
};

// Obtener una reseña por ID
const getResenaByProdId = async (req, res) => {
  try {
    const resena = await resenaModel.getResenaByProdId(req.params.id);
    if (!resena) return res.status(404).json({ error: "Reseña no encontrada" });
    res.json(resena);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la reseña por producto" });
  }
};

const getResenaByUser = async (req, res) => {
  try {
    const resena = await resenaModel.getResenaByUser(req.params.id);
    if (!resena) return res.status(404).json({ error: "Reseña no encontrada" });
    res.json(resena);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la reseña" });
  }
};

// Crear una nueva reseña
const postCrearResena = async (req, res) => {
  try {
    const nuevaResena = await resenaModel.postCrearResena(req.body);
    res.status(201).json(nuevaResena);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reseña" });
  }
};

// Actualizar una reseña
const putActualizarResena = async (req, res) => {
  try {
    const resenaActualizada = await resenaModel.putActualizarResena(req.params.id, req.body);
    if (!resenaActualizada) return res.status(404).json({ error: "Reseña no encontrada" });
    res.json(resenaActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la reseña" });
  }
};

// Eliminar una reseña
const deleteEliminarResena = async (req, res) => {
  try {
    const eliminado = await resenaModel.deleteEliminarResena(req.params.id);
    if (!eliminado) return res.status(404).json({ error: "Reseña no encontrada" });
    res.json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la reseña" });
  }
};

export const resenaController = {
    getAllResena,
    getResenaById,
    getResenaByProdId,
    getResenaByUser,
    postCrearResena,
    putActualizarResena,
    deleteEliminarResena };
