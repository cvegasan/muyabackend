import { Router } from 'express';
import { usuariosController } from '../controllers/usuariosController.js';
import { verifyCredentials } from '../middlewares/usuariosMiddleware.js';
import { verifyToken, verificarRol } from "../middlewares/usuariosMiddleware.js";
const router = Router();

//usuariosController

// verifyCredentials: Se valida email + password
// usuariosController.login: Retorna el token + id
router.post('/login', verifyCredentials, usuariosController.login);
router.post('/registro', usuariosController.registerUser);

//INI ACCESO RESTRINGIDO con Token y Rol de admin (1)
router.get('/', verifyToken, verificarRol([1]),usuariosController.getAllUsers);
//FIN ACCESO RESTRINGIDO con Token y Rol de admin (1)

router.all('*', (req, res) => {
    res.status(404).json({ message: 'Pagina no encontrada' });
});

export default router;