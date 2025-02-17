import { usersModel } from '../models/usuariosModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const verifyCredentials = async (req, res, next) => {
  try {

    const { email, password } = req.body;  

    if (!email || !password) {
      throw { message: 'Email and password required.' };
    }
    const user = await usersModel.getUser(email);
    if (!user) {
      throw { message: `This email is not registered ${email}.` };
    }


    const { passwordBD, id } = await usersModel.getContrasena(email, password);

    const verifyPassword = await bcrypt.compare(password, passwordBD);
    if (!verifyPassword) {
      throw { message: 'Incorrect password.' };
    }
    req.user = { id, email: email };    
    next();

  } catch (error) {
    console.log('Error Login: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const verifyData = async (req, res, next) => {
  try {
    const { nombre, email, password, password2 } = req.body;
    const user = await usersModel.getUser(email);

    if (!nombre || !email || !password || !password2) {
      throw new Error('Name, Email and Password required.');
    }

    if (user) {
      throw new Error(`This email is registered ${email}.`);
    }

    if (password !== password2) {
      throw new Error('Different Passwords');
    }

    req.user = {
      nombre: nombre,
      email: email,
      password: password,
      password2: password2
    };
    next();    
  } catch (error) {
    console.error('verifyData Error Register:', error.message);
    res.status(400).json({ error: error.message });
  }
};

export const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new Error('Error al obtener Token.');
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new Error('Formato token incorrecto.');
    }

    const payload = jwt.verify(token, process.env.JWT_PASSWORD);
    if (!payload) {
      throw new Error('Token inválido.');
    }
    req.user = { id: payload.id};  // Asegurar que req.user tenga los valores correctos

    req.body.email = payload.email;

    next();
  } catch (error) {
    console.log('Error verificar Token: ', error.message);
    res.status(401).json({ message: "Usuario no autenticado" });
  }
};

export const verificarRol = (rolesPermitidos) => {
  return async (req, res, next) => {
    try {
      console.log("verificaRol<--",req.user)
      if (!req.user || !req.user.id) {
        return res.status(403).json({ message: "Usuario no autenticado" });
      }

      // Obtener el rol del usuario desde la base de datos
      console.log("req.user.id <--",req.user.id);
      const rolUsuario = await usersModel.getRol(req.user.id);
      if (!rolUsuario) {
        return res.status(403).json({ message: "Rol no encontrado" });
      }

      // Validar si el rol del usuario está en los roles permitidos
      if (!rolesPermitidos.includes(rolUsuario)) {
        return res.status(403).json({ message: "Acceso denegado" });
      }

      next();
    } catch (error) {
      console.error("Error en verificarRol:", error.message);
      res.status(500).json({ message: "Error en la validación del rol" });
    }
  };
};
