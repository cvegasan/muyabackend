
import { usersModel } from '../models/usuariosModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const login = async (req, res) => {
  try {
    console.log("req.body<--",req.body);
    console.log ("req.user<--",req.user);
    const { id, email } = req.user;
    const token = jwt.sign(
        { id: req.user.id, email: req.user.email }, 
        process.env.JWT_PASSWORD, 
        { expiresIn: "1h" }
      );

    res.json({ token, id , email});

  } catch (error) {
    console.log('Error Login: ', error.message);
    res.status(500).json({ message: error.message });
  }
};


const registerUser = async (req, res) => {
  try {
    const { usu_nombre, usu_email, usu_contrasena, usu_direccion,usu_telefono,rol_id } = req.body;
    console.log("Datos recibidos en req.body:", req.body);

    if (!usu_nombre || !usu_email || !usu_contrasena || !usu_direccion|| !usu_telefono) {
      throw new Error ('Los campos nombre, email, contraseña, dirección y teléfono son obligatorios.');
    }

    const verifyEmail = await usersModel.verifyUserEmail(usu_email);
    console.log("verifyEmail en registeruser: ");
    console.log(verifyEmail);
    if (verifyEmail.rowCount>0){
      throw new Error('Email ya registrado.');
    }

    const result = await usersModel.createUser({
      usu_nombre
      ,usu_email
      ,usu_contrasena: bcrypt.hashSync(usu_contrasena, 10)
      ,usu_direccion
      ,usu_telefono
      ,rol_id
    });

    console.log('Registro Usuario: ', result);
    res.status(201).json({ message: 'Usuario registrado con éxito.' });

  } catch (error) {
    console.log('Error al registrar usuario: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const usuarios = await usersModel.getAllUsers();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

export const usuariosController = {
  login,
  registerUser,
  getAllUsers
};
