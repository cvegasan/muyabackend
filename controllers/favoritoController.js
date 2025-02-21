import { favoritosModel } from '../models/favoritoModel.js';
import dotenv from "dotenv";

dotenv.config();

const getAllFavoritos = async (req, res) => {
  try {
    const favoritos = await favoritosModel.getAllFavoritos();
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFavoritosById = async (req, res) => {
  try {
    const { id } = req.params;
    const favorito = await favoritosModel.getFavoritosById(id);
    res.json(favorito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserFavoritos = async (req, res) => {
  try {
    const usu_id = req.params.user;
    const favoritosUser = await favoritosModel.getUserFavoritos(usu_id);
    res.json(favoritosUser);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener favorito(s) del usuario" });
  }
};

const getProdFavoritos = async (req, res) => {
  try {
    const pro_id  = req.params.prod;
    const favoritosProd = await favoritosModel.getProdFavoritos(pro_id);
    res.json(favoritosProd);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener favorito(s) por producto" });
  }
};




const postCrearFavoritos = async (req, res) => {
  try {
    const { usu_id, pro_id } = req.body;
    if (!usu_id || !pro_id) {
      return res.status(400).json({ error: "usu_id y pro_id son requeridos" });
    }
    const newFavorito = await favoritosModel.postCrearFavoritos({ usu_id, pro_id });
    res.status(201).json(newFavorito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putActualizarFavoritos = async (req, res) => {
  try {
    const { id } = req.params;
    const { usu_id, pro_id } = req.body;
    if (!usu_id || !pro_id) {
      return res.status(400).json({ error: "usu_id y pro_id son requeridos" });
    }
    const updatedFavorito = await favoritosModel.putActualizarFavoritos(id, { usu_id, pro_id });
    res.json(updatedFavorito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEliminarFavoritos = async (req, res) => {
  try {
    // Obtener los parámetros desde la URL
    const { usu_id, pro_id } = req.params;

    // Validar que los parámetros existen
    if (!usu_id || !pro_id) {
      return res.status(400).json({ error: "usu_id y pro_id son requeridos" });
    }

    // Llamar al modelo para eliminar el favorito
    const result = await favoritosModel.deleteEliminarFavoritos(usu_id, pro_id);

    // Responder con el resultado
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const favoritosController = {
    getAllFavoritos,
    getFavoritosById,
    getUserFavoritos,
    getProdFavoritos,
    postCrearFavoritos,
    putActualizarFavoritos,
    deleteEliminarFavoritos
};
