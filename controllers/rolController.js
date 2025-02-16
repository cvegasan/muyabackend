import { rolModel } from '../models/rolModel.js';
import dotenv from "dotenv";

dotenv.config();

// Obtener todos los roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await rolModel.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los roles" });
  }
};

// Obtener un rol por ID
const getRolById = async (req, res) => {
  try {
    const rol = await rolModel.getRolById(req.params.id);
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });
    res.json(rol);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el rol" });
  }
};

// Crear un nuevo rol
const postCrearRol = async (req, res) => {
  try {
    const nuevoRol = await rolModel.createRol(req.body);
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el rol" });
  }
};

// Actualizar un rol
const putActualizarRol = async (req, res) => {
  try {
    const rolActualizado = await rolModel.putActualizarRol(req.params.id, req.body);
    if (!rolActualizado) return res.status(404).json({ error: "Rol no encontrado" });
    res.json(rolActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el rol" });
  }
};

// Eliminar un rol
const deleteEliminarRol = async (req, res) => {
  try {
    const eliminado = await rolModel.deleteEliminarRol(req.params.id);
    if (!eliminado) return res.status(404).json({ error: "Rol no encontrado" });
    res.json({ message: "Rol eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el rol" });
  }
};

export const rolController = {
    getAllRoles,
    getRolById,
    postCrearRol,
    putActualizarRol,
    deleteEliminarRol
  };