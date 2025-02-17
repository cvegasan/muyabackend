
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
    const { nombre, email, password, password2, rol = 2 } = req.body;

    if (!nombre || !email || !password || !password2 ) {
      throw new Error ('Required fields ');
    }

    const verifyEmail = await usersModel.verifyUserEmail(email);
    if (verifyEmail.rowCount>0){
      throw new Error('Existing email');
    }

    const result = await usersModel.createUser({
      nombre
      ,email
      ,password: bcrypt.hashSync(password, 10)
      ,rol
    });

    res.status(201).json({ success: true, message: "Successful registration!" });
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
